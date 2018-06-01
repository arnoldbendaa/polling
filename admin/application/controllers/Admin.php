<?php

Class Admin extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        if(isset($this->session->userdata['logged_in'])){
            //$this->load->view('admin_page');
        }else{
            redirect('Login');
        }

        $this->load->helper('form');
        $this->load->library('form_validation');
        $this->load->library('session');
        $this->load->model('login_database');
    }
    public function index(){
        $this->load->view('admin/index');
    }
    public function viewProposals(){
        $this->load->view('admin/viewProposals');
    }
    public function viewUsers(){
        $this->load->view('admin/viewUsers');
    }
    public function removeUser($userId){
        $id = intval($userId);
        if(empty($userId)||$id<1){
            $result["err"]=1;
            $result["errMsg"] = "Invalid param";
            echo json_encode($result);
            return;
        }
        $sql = "delete from client where userId=$id";
        $result = $this->db->query($sql);
        if(!empty($result)){
            $this->outSuccess();
            return;
        }else{
            $this->outError("Database error");
            return;
        }
    }
    function getUserDatas(){
        $start = $this->input->get('start');
        $length = $this->input->get('length');
        $draw = $this->input->get('draw');
        $searchKey = $this->input->get('search[value]');
        $orderColumn = $this->input->get('order[0][column]');
        $orderDirection = $this->input->get('order[0][dir]');
        $dbRecordsTotal = $this->db->query("Select count(*) as cnt from client")->result();
        $recordsTotal = $dbRecordsTotal[0]->cnt;
        $where = " where 1=1 ";
        if(!empty($searchKey)){
            $where .= "and username like '%$searchKey%' or email like '%$searchKey%'";
        }
        $order = "";
        if($orderColumn>-1){
           switch ($orderColumn){
               case 0:
                   $order = " order by username $orderDirection";
                   break;
               case 1:
                   $order = " order by email $orderDirection";
                   break;
               case 2:
                   $order = " order by emailVerified $orderDirection";
                   break;
               case 3:
                   $order = " ";
                   break;
               case 4:
                   $order = " order by created $orderDirection";
                   break;
               default:
                    $order = "";
           }
        }
        $limit = " limit $start,$length";
        $dbResultsFiltered = $this->db->query("Select count(*) as cnt from client".$where)->result();
        $recordsFiltered = $dbResultsFiltered[0]->cnt;
        $results = $this->db->query("select * from client ".$where.$order.$limit)->result();
        $dbresults = [];
        foreach($results as $key=>$result){
            $locationId = $result->locationId;
            $sql = "SELECT (SELECT `name` FROM location WHERE id=$locationId) AS communityName,
                    (SELECT parentId FROM location WHERE id=$locationId ) AS cityId,
                    (SELECT `name` FROM location WHERE id=cityId) AS cityName,
                    (SELECT parentId FROM location WHERE id=cityId ) AS provinceId,
                    (SELECT `name` FROM location WHERE id=provinceId) AS provinceName,
                    (SELECT parentId FROM location WHERE id=provinceId ) AS coutnryId,
                    (SELECT `name` FROM location WHERE id=coutnryId) AS coutnryName";
            $locationResult = $this->db->query($sql)->result();
            $locationString = $locationResult[0]->coutnryName.",".$locationResult[0]->provinceName.",".$locationResult[0]->cityName.",".$locationResult[0]->communityName;
            $actionString = "<i class=\"fa fa-trash\"style=\"cursor:pointer\" id=\"pop_".$result->userId."\" data-id=\"".$result->userId."\" data-toggle=\"confirmation\" ></i>&nbsp;
                                            <a href='".base_url()."Admin/editUser/".$result->userId."'><i style=\"cursor:pointer\" class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i></a>";
            $dbresults[$key] = [$result->username,$result->email,$result->emailVerified==1?"Yes":"No",$locationString,$result->created,$actionString];
        }
        $result = [];
        $result['draw'] = $draw;
        $result['recordsTotal'] = $recordsTotal;
        $result['recordsFiltered'] = $recordsFiltered;
        $result['data'] = $dbresults;
        echo json_encode($result);
    }
    public function editUser($userId){
        $countryResult = $this->db->query("select * from location where depth=0 order by name")->result();
        $data['countries'] = $countryResult;
        $dbResult = $this->db->query("select * from client where userId=$userId")->result();
        if(empty($dbResult)){
            echo "Invalid Param";
            return;
        }
        $locationId = $dbResult[0]->locationId;
        $sql = "SELECT (SELECT `name` FROM location WHERE id=$locationId) AS communityName,
                    (SELECT parentId FROM location WHERE id=$locationId ) AS cityId,
                    (SELECT `name` FROM location WHERE id=cityId) AS cityName,
                    (SELECT parentId FROM location WHERE id=cityId ) AS provinceId,
                    (SELECT `name` FROM location WHERE id=provinceId) AS provinceName,
                    (SELECT parentId FROM location WHERE id=provinceId ) AS countryId,
                    (SELECT `name` FROM location WHERE id=countryId) AS coutnryName";
        $locationDb = $this->db->query($sql)->result();
        $data['countryId'] = $locationDb[0]->countryId;
        $data['provinceId'] = $locationDb[0]->provinceId;
        $data['cityId'] = $locationDb[0]->cityId;
        $data['communityId'] = $locationId;

        $data['user']=$dbResult[0];
        $this->load->view('admin/editUser',$data);
    }
    public function getProvinces($countryId){
        if($countryId<1){
            $this->outError("Invalid Param");
        }
        $resultdb = $this->db->query("select id,name from location where parentId=$countryId and depth=1 order by name")->result();
        echo json_encode($resultdb);
    }
    public function getCities($provinceId){
        if($provinceId<1){
            $this->outError("Invalid Param");
        }
        $resultdb = $this->db->query("select id,name from location where parentId=$provinceId and depth=2 order by name")->result();
        echo json_encode($resultdb);
    }
    public function getCommunities($cityId){
        if($cityId<1){
            $this->outError("Invalid Param");
        }
        $resultdb = $this->db->query("select id,name from location where parentId=$cityId and depth=3 order by name")->result();
        echo json_encode($resultdb);
    }

    public function editUserLocation(){
        $locationId = $this->input->post('community');
        $userId = $this->input->post("userId");
        if($userId<1 || $locationId<1 ) {
            $this->outError("Invalid Param");
            return;
        }
        $sql = "UPDATE `client` SET locationId=$locationId WHERE userId=$userId";
        $result = $this->db->query($sql);
        redirect(base_url()."Admin/viewUsers");
    }
    public function changePassword($msg=null){
        $data["msg"] = $msg;
        $this->load->view("admin/changePassword",$data);
    }
    public function doChangePassword(){
        $currentPassword = $this->input->post("currentPassword");
        $newPassword = $this->input->post("newPassword");
        $confirmPassword = $this->input->post("confirmPassword");
        if(empty($currentPassword)||empty($newPassword)||$newPassword!=$confirmPassword){
            $this->outError("Invalid Param");
            return;
        }
        $dbResult = $this->db->query("SELECT * FROM admin WHERE `password`=MD5('$currentPassword');")->result();
        if(empty($dbResult)){
            redirect(base_url()."Admin/changePassword/incorrect password");
            return;
        }
        $sql = "Update admin set password=md5('$newPassword') where password=md5('$currentPassword')";
        $this->db->query($sql);
        $this->outSuccess();
        redirect(base_url()."Admin/changePassword/Success");
    }
    public function community(){

        $this->load->view("Admin/community");
    }
    public function outSuccess(){
        $result["err"]=0;
        $result["errMsg"] = "Success";
        echo json_encode($result);
    }
    public function outError($msg){
        $result["err"]=1;
        $result["errMsg"] = $msg;
        echo json_encode($result);
    }
}
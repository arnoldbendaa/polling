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
        $results = $this->db->query("select * from client order by created")->result();
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
            $results[$key]->locationString = $locationString;
        }
        $data["results"] = $results;
        $this->load->view('admin/viewUsers',$data);
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
                                            <i style=\"cursor:pointer\" class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>";
            $dbresults[$key] = [$result->username,$result->email,$result->emailVerified==1?"Yes":"No",$locationString,$result->created,$actionString];
        }
        $result = [];
        $result['draw'] = $draw;
        $result['recordsTotal'] = $recordsTotal;
        $result['recordsFiltered'] = $recordsFiltered;
        $result['data'] = $dbresults;
        echo json_encode($result);
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
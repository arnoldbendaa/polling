<?php include("Header.php");?>
<!-- Left side column. contains the logo and sidebar -->
<?php $page="user"?>
<?php include("Sidebar.php");?>
<div class="content-wrapper">
    <section class="content-header">
        <h1>
            Edit
            <small>Users</small>
        </h1>
    </section>

    <!-- Main content -->
    <section class="content">
        <div class="box">
            <form role="form" id="editForm" action="<?php echo base_url();?>Admin/editUserLocation" method="post">
                <input type="hidden" name="userId" value="<?=$user->userId?>"/>
                <div class="box-body">
                        <div class="form-group">
                            <label>User name</label>
                            <input type="text" class="form-control" placeholder="user name" disabled="" value="<?=$user->username?>">
                        </div>
                        <div class="form-group">
                            <label>Email Address</label>
                            <input type="text" class="form-control" placeholder="username" disabled="" value="<?=$user->email?>">
                        </div>
                        <div class="form-group">
                            <label>Created</label>
                            <input type="text" class="form-control" placeholder="username" disabled="" value="<?=$user->created?>">
                        </div>
                        <div class="form-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" disabled  value="<?php if($user->emailVerified) echo 'checked';?>"> Email Verified
                                </label>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-3">
                                <label>Country</label>
                                <select class="form-control" id="country">
                                    <?php foreach($countries as $country){
                                        ?>
                                    <option value="<?=$country->id?>"><?=$country->name?></option>
                                    <?php } ?>
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label>Province</label>
                                <select class="form-control" id="province">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label>City</label>
                                <select class="form-control" id="city">
                                </select>
                            </div>
                            <div class="col-sm-3">
                                <label>Community</label>
                                <select class="form-control" id="community" name="community">
                                </select>
                            </div>
                            </select>
                        </div>
                </div>
                <div class="box-footer">
                    <a href="<?php echo base_url();?>Admin/viewUsers"  class="btn btn-default">Cancel</a>
                    <button type="submit" class="btn btn-info pull-right">Save</button>
                </div>
            </form>

        </div>
    </section>
</div>
<script>
    var countryId = '<?=$countryId?>';
    var provinceId = '<?=$provinceId?>';
    var cityId = '<?=$cityId?>';
    var communityId = '<?=$communityId?>';

    $(function(){
        $("#country").val(countryId);
        changeCountry(function(){
            $("#province").val(provinceId);
            changeProvince(function(){
                $("#city").val(cityId);
                changeCity(function(){
                    $("#community").val(communityId);
                });
            });
        });
        $('#country').on('change', function() {
            changeCountry(function () {
                $("#city").html("");
                $("#community").html("");
            });
        })
        $('#province').on('change', function() {
            changeProvince(function(){
                $("#community").html("");
            });
        })
        $('#city').on('change', function() {
            changeCity(function(){

            });
        })


    })
    function changeCountry(callback){
        countryId=$("#country").val();
        $.ajax({
            url:'<?=base_url()?>Admin/getProvinces/'+countryId,
            type:'GET',
            success:function(response){
                var html = generateHtml(JSON.parse(response),provinceId);
                $("#province").html(html);
                if(callback!=null)
                    callback();
            }
        })
    }
    function changeProvince(callback){
        provinceId = $("#province").val();
        $.ajax({
            url:'<?=base_url()?>Admin/getCities/'+provinceId,
            type:'GET',
            success:function(response){
                var html = generateHtml(JSON.parse(response),cityId);
                $("#city").html(html);
                if(callback!=null)
                    callback();
            }
        })
    }
    function changeCity(callback){
        cityId = $("#city").val();
        $.ajax({
            url:'<?=base_url()?>Admin/getCommunities/'+cityId,
            type:'GET',
            success:function(response){
                var html = generateHtml(JSON.parse(response),communityId);
                $("#community").html(html);
                if(callback!=null)
                    callback();
            }
        })
    }
    function generateHtml(datas,id) {
        var html='<option value="0">Please select</option>';
        for(var i = 0 ; i < datas.length; i++){
            if(datas[i].id==id)
                html +='<option value="'+datas[i].id+'" selected>'+datas[i].name+'</option>';
            else
                html +='<option value="'+datas[i].id+'">'+datas[i].name+'</option>';
        }
        return html;
    }

    $("#editForm")
        .on('submit', function(e) {
            var comId = $("#community").val();
            if(comId<1){
                swal("Please Select a Community!","", "warning");
                e.preventDefault();
            }
        });

</script>
<?php include("Footer.php");?>
<?php include("Header.php");?>
<!-- Left side column. contains the logo and sidebar -->
<?php $page="changePassword"?>
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
            <form role="form" id="passwordForm" action="<?php echo base_url();?>Admin/doChangePassword" method="post">
                <h3 class="control-label text-danger text-center" for="inputWarning"> <?=urldecode($msg)?></h3>
                <div class="box-body">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" class="form-control" placeholder="Current Password" name="currentPassword">
                    </div>
                    <div class="form-group">
                        <label>New Password</label>
                        <input type="password" class="form-control" placeholder="New Password" name="newPassword" id="newPassword">
                    </div>
                    <div class="form-group">
                        <label>Confirm Password</label>
                        <input type="password" class="form-control" placeholder="Confirm Password" name="confirmPassword" id="confirmPassword" >
                    </div>
                </div>
                <div class="box-footer">
                    <button type="submit" class="btn btn-info pull-right">Submit</button>
                </div>
            </form>
        </div>
    </section>
</div>
    <script>
        $("#passwordForm")
            .on('submit', function(e) {
                var newPassword = $("#newPassword").val();
                var confirmPassword = $("#confirmPassword").val();
                if(newPassword==""||newPassword==null||newPassword==undefined){
                    swal("Please input a password.","", "warning");
                    e.preventDefault();
                    return;
                }
                if(newPassword!=confirmPassword){
                    swal("Password mismatch","", "warning");
                    e.preventDefault();
                    return;
                }
            });
    </script>
<?php include("Footer.php");?>
<?php include("Header.php");?>
    <!-- Left side column. contains the logo and sidebar -->
<?php $page="user"?>
<?php include("Sidebar.php");?>
    <!-- Content Wrapper. Contains page content -->
    <!-- DataTables -->
    <link rel="stylesheet" href="../../bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">

    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                View
                <small>Users</small>
            </h1>
        </section>

        <!-- Main content -->
        <section class="content">
            <div class="box">
                <div class="box-body">
                    <div id="example1_wrapper" class="dataTables_wrapper form-inline dt-bootstrap">
                        <div class="row">
                            <div class="col-sm-12">
                                <table id="example1" class="table table-bordered table-striped dataTable" role="grid" aria-describedby="example1_info">
                                    <thead>
                                    <tr role="row">
                                        <th class="sorting_asc" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Rendering engine: activate to sort column descending">User Name</th>
                                        <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Browser: activate to sort column ascending">Email</th>
                                        <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Platform(s): activate to sort column ascending">Verified</th>
                                        <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending">Location</th>
                                        <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending">Created</th>
                                        <th class="sorting" tabindex="0" aria-controls="example1" rowspan="1" colspan="1" aria-label="Engine version: activate to sort column ascending">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- /.box-body -->
            </div>
        </section>
        <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->
    <!-- DataTables -->
    <script src="<?php echo base_url();?>bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
    <script src="<?php echo base_url();?>bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
    <!-- Bootstrap 3.3.7 -->
    <script src="<?php echo base_url();?>bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <script src="<?php echo base_url();?>js/bootstrap-tooltip.js"></script>
    <script src="<?php echo base_url();?>js/bootstrap3-confirmation.js"></script>

    <script>
        $(function () {
            function drawtable() {
                $('#example1').DataTable({
                    "serverSide": true,
                    "bSortable":true,
                    "bSearchable":true,
                    "ajax": {
                        "url": '<?php echo base_url();?>Admin/getUserDatas',
                        type:'get'
                    },
                    "columns": [
                        null,
                        null,
                        null,
                        { "orderable": false },
                        null,
                        { "orderable": false }
                    ],
                    "drawCallback": function( settings ) {
                        $('[data-toggle=confirmation]').confirmation({
                            rootSelector: '[data-toggle=confirmation]',
                            title:"Sure delete?",
                            placement:'left',
                            delay: { show: 100, hide: 100 },
                            popout:true,
                            onConfirm:function(){
                                deleteUser(this.id);
                                $("#pop_"+this.id).trigger('click');
                            },
                            onCancel:function () {
                                console.log(this);
                                $("#pop_"+this.id).trigger('click');
                            }
                        });
                    }
                });
            }
            drawtable();
        })
        function deleteUser(userId){
            $.ajax({
                url:"<?=base_url()?>Admin/removeUser/"+userId,
                type:"GET",
                success:function(response){
                    drawTable();
                }
            })
        }

    </script>
<?php include("Footer.php");?>
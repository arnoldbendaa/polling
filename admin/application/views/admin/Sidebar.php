<!-- Left side column. contains the logo and sidebar -->
<aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <ul class="sidebar-menu" data-widget="tree">
            <li class="<?php if($page=="proposal") echo "active";?>"><a href="<?php echo base_url();?>Admin/viewProposals"><i class="fa fa-circle-o text-red"></i> <span>Proposals</span></a></li>
            <li class="<?php if($page=="user") echo "active";?>"><a href="<?php echo base_url();?>Admin/viewUsers"><i class="fa fa-circle-o text-yellow"></i> <span>Users</span></a></li>
            <li class="<?php if($page=="community") echo "active";?>"><a href="<?php echo base_url();?>Admin/community"><i class="fa fa-circle-o text-green"></i> <span>Communities</span></a></li>
            <li class="<?php if($page=="changePassword") echo "active";?>"><a href="<?php echo base_url();?>Admin/changePassword"><i class="fa fa-circle-o text-aqua"></i> <span>Change Password</span></a></li>
        </ul>
    </section>
    <!-- /.sidebar -->
</aside>

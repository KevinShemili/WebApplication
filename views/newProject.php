<?php
session_start();
require "../database/config.php";
require "../scripts/getUser.php";

if (isset($_SESSION['user_id'])) {
    if ($_SESSION['role'] == "admin") {
    } else if ($_SESSION['role'] == "hr")
        header('location:hrMain.php');
    else if ($_SESSION['role'] == "employee")
        header('location:EmployeeMain.php');
} else
    header('location:../index.php');

if (isset($_SESSION["user_id"])) {
    $userId = $_SESSION["user_id"];
    $user = getUserById_SelectAll($userId, $connection);
}


?>

<!DOCTYPE html>

<html lang="en" class="light-style layout-menu-fixed" dir="ltr" data-theme="theme-default" data-assets-path="assets/" data-template="vertical-menu-template-free">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

    <title>HRMS</title>

    <meta name="description" content="" />

    <link rel="icon" type="../image/x-icon" href="../assets/img/hrms.jpg" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />

    <link rel="stylesheet" href="../assets/vendor/fonts/boxicons.css" />


    <link rel="stylesheet" href="../assets/vendor/css/core.css" class="template-customizer-core-css" />
    <link rel="stylesheet" href="../assets/vendor/css/theme-default.css" class="template-customizer-theme-css" />
    <link rel="stylesheet" href="../assets/css/demo.css" />

    <link rel="stylesheet" href="../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css" />

    <link rel="stylesheet" href="../assets/vendor/libs/apex-charts/apex-charts.css" />
    <script src="../assets/vendor/js/helpers.js"></script>

    <script src="../assets/js/config.js"></script>
    <script src="../js/newProject.js" defer></script>

</head>

<body>

    <!-- Modal1 Start -->
    <div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle" style="color: black;">Success.</h5>
                    <button type="button" id="closeModal" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Project Published.
                </div>
            </div>
        </div>
    </div>
    <!-- Modal1 End -->

    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->

            <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
                <div class="app-brand demo">
                    <a href="adminMain.php" class="app-brand-link">
                        <h2 class="">HRMS</h2>
                    </a>
                </div>

                <ul class="menu-inner py-1">
                    <!-- Dashboard -->
                    <li class="menu-item">
                        <a href="adminMain.php" class="menu-link">
                            <i class="menu-icon tf-icons bx bx-home-circle"></i>
                            <div data-i18n="Analytics">Dashboard</div>
                        </a>
                    </li>

                    <li class="menu-item">
                        <a href="adminProjects.php" class="menu-link">
                            <i class="menu-icon tf-icons bx bx-collection"></i>
                            <div data-i18n="Basic">Projects</div>
                        </a>
                    </li>

                    <li class="menu-item active">
                        <a href="#" class="menu-link">
                            <i class="menu-icon tf-icons bx bx-collection"></i>
                            <div data-i18n="Basic">Add New Project</div>
                        </a>
                    </li>
                    <li class="menu-item active">
                        <a href="Admin_Employee_Section.php" class="menu-link">
                            <i class="menu-icon tf-icons bx bx-male "></i>
                            <div data-i18n="Analytics">Employees</div>
                        </a>
                    </li>
                    <li class="menu-item " style="">
                            <a href="javascript:void(0);" class="menu-link menu-toggle">
                                <i class="menu-icon tf-icons bx bx-dollar"></i>
                                <div data-i18n="Misc">Finance</div>
                            </a>
                            <ul class="menu-sub">
                                <li class="menu-item">
                                    <a href="Contracts.php" class="menu-link">
                                        <div data-i18n="Error">Contracts</div>
                                    </a>
                                </li>
                                <li class="menu-item">
                                    <a href="Working_Activity.php" class="menu-link">
                                        <div data-i18n="Under Maintenance">Working Activity</div>
                                    </a>
                                </li>
                                <li class="menu-item">
                                    <a href="Transactions.php" class="menu-link">
                                        <div data-i18n="Under Maintenance">Transactions</div>
                                    </a>
                                </li>
                            </ul>
                    </li>

                </ul>
            </aside>
            <!-- / Menu -->

            <!-- Layout container -->
            <div class="layout-page">
                <!-- Navbar -->

                <nav class="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme" id="layout-navbar">
                    <div class="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                        <a class="nav-item nav-link px-0 me-xl-4" href="javascript:void(0)">
                            <i class="bx bx-menu bx-sm"></i>
                        </a>
                    </div>

                    <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">

                        <ul class="navbar-nav flex-row align-items-center ms-auto">
                            <!-- User -->
                            <li class="nav-item navbar-dropdown dropdown-user dropdown">
                                <a class="nav-link dropdown-toggle hide-arrow" href="" data-bs-toggle="dropdown">
                                    <img src="../assets/img/profiles/default.png" alt class="w-px-40 h-auto rounded-circle" />
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li>
                                        <a class="dropdown-item" href="#">
                                            <div class="d-flex">
                                                <div class="flex-shrink-0 me-3">
                                                </div>
                                                <div class="flex-grow-1">
                                                    <?php
                                                    echo '
                                                    <span class="fw-semibold d-block">' . $user["username"] . '</span>
                                                    <small class="text-muted">' . strtoupper($user["role"]) . '</small>
                                                    ';
                                                    ?>

                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <li>
                                        <div class="dropdown-divider"></div>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="myProfile.php">
                                            <i class="bx bx-user me-2"></i>
                                            <span class="align-middle">My Profile</span>
                                        </a>
                                    </li>
                                    <li>
                                        <div class="dropdown-divider"></div>
                                    </li>
                                    <li>
                                        <a class="dropdown-item" href="../scripts/logout.php">
                                            <i class="bx bx-power-off me-2"></i>
                                            <span class="align-middle">Log Out</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <!--/ User -->
                        </ul>
                    </div>
                </nav>

                <!-- / Navbar -->

                <div class="content-wrapper">
                    <!-- Content -->

                    <div class="container-xxl flex-grow-1 container-p-y">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="card mb-4">
                                    <h5 class="card-header">Add New Project</h5>
                                    <div>
                                        <h6 id="invisible-error1" class="card-header" style="color: red;"></h6>
                                    </div>
                                    <hr class="my-0" />
                                    <div class="card-body">
                                        <div class="row">
                                            <div class="mb-3 col-md-6">
                                                <label for="projectName" class="form-label">Project Name</label>
                                                <input class="form-control" type="text" id="projectName" name="projectName" placeholder="Angular 13 Pet Store Client" autofocus />
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label for="clientName" class="form-label">Client Name</label>
                                                <input class="form-control" type="text" id="clientName" name="clientName" placeholder="John" />
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label for="email" class="form-label">Client Email</label>
                                                <input class="form-control" type="text" id="email" name="email" placeholder="john.doe@example.com" />
                                            </div>
                                            <div class="mb-3 col-md-6">
                                                <label for="country" class="form-label">Country</label>
                                                <input class="form-control" type="text" id="country" name="country" placeholder="United States" />
                                            </div>

                                        </div>
                                        <div class="mb-3">
                                            <label for="description">Description</label>
                                            <textarea class="form-control" id="description" name="description" rows="3"></textarea>
                                        </div>
                                        <div class="mt-2">
                                            <button type="submit" id="publish" class="btn btn-primary me-2">Publish</button>
                                            <button type="reset" id="cancel" class="btn btn-outline-secondary">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- / Content -->

                    <div class="content-backdrop fade"></div>
                </div>

                <!-- Footer -->
                <footer class="content-footer footer bg-footer-theme">
                    <div class="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                        <div class="mb-2 mb-md-0">
                            Software Engineering Project
                        </div>
                    </div>
                </footer>
                <!-- / Footer -->

                <div class="content-backdrop fade"></div>
            </div>
            <!-- Content wrapper -->
        </div>
        <!-- / Layout page -->
    </div>

    <div class="layout-overlay layout-menu-toggle"></div>
    </div>



    <script src="../assets/vendor/libs/jquery/jquery.js"></script>
    <script src="../assets/vendor/libs/popper/popper.js"></script>
    <script src="../assets/vendor/js/bootstrap.js"></script>
    <script src="../assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js"></script>

    <script src="../assets/vendor/js/menu.js"></script>

    <script src="../assets/vendor/libs/apex-charts/apexcharts.js"></script>

    <script src="../assets/js/main.js"></script>

    <script src="../assets/js/dashboards-analytics.js"></script>

</body>

</html>
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
    function getJson($message)
    {
        return json_encode($message);
    }
    
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
    <link rel="stylesheet" href="../css/contract_style.css" />

    <script src="../assets/vendor/js/helpers.js"></script>

    <script src="../assets/js/config.js"></script>
    <script src="../js/updateContract.js" defer></script>



</head>

<body>
    <!-- Layout wrapper -->
    <div class="layout-wrapper layout-content-navbar">
        <div class="layout-container">
            <!-- Menu -->

            <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
                <div class="app-brand demo">
                    <a href="#" class="app-brand-link">
                        <h2 class="">HRMS</h2>
                    </a>
                </div>

                <ul class="menu-inner py-1">
                    <!-- Dashboard -->
                    <li class="menu-item ">
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

                    <li class="menu-item ">
                        <a href="Admin_Employee_Section.php" class="menu-link">
                            <i class="menu-icon tf-icons bx bx-male "></i>
                            <div data-i18n="Analytics">Employees</div>
                        </a>
                    </li>

                    <li class="menu-item active open" style="" >
                            <a href="javascript:void(0);" class="menu-link menu-toggle">
                                <i class="menu-icon tf-icons bx bx-dollar"></i>
                                <div data-i18n="Misc">Finance</div>
                            </a>
                            <ul class="menu-sub active" id="sublist">
                                <li class="menu-item active">
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



                <!-- Footer -->
                <footer class="content-footer footer bg-footer-theme">
                <div class="container-xxl flex-grow-1 container-p-y">
  <div class="row">
    <div class="col-md-12">
      <div class="card mb-4">
        <h5 class="card-header">Contract Agreement</h5>
        <div>
          <h6 id="invisible-error1" class="card-header" style="color: red;"></h6>
        </div>
        <hr class="my-0" />
        <div class="card-body">
          <h6>Dear <label id="name"></label> <label id="surname"></label>,</h6>
          <p>We are pleased to present you with an employment contract. Please review the terms and conditions below:</p>
          
          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="paymentRate" class="form-label">Payment Rate</label>
              <input class="form-control" type="text" id="paymentRate" name="paymentRate" placeholder="Enter payment rate" autofocus />
            </div>
            <div class="mb-3 col-md-6">
              <label for="hoursPerDay" class="form-label">Hours of Work per Day</label>
              <input class="form-control" type="text" id="hoursPerDay" name="hoursPerDay" placeholder="Enter average hours per day" required />
            </div>
            <div class="mb-3 col-md-6">
              <label for="bonusRate" class="form-label">Bonus Payment Rate</label>
              <input class="form-control" type="text" id="bonusRate" name="bonusRate" placeholder="Enter bonus payment rate" required />
            </div>
          </div>
          
          <div class="mt-2">
            <button type="submit" id="sendContract" class="btn btn-primary me-2">Send</button>
            <button type="reset" id="cancelContract" class="btn btn-outline-secondary">Cancel</button>
          </div>
        </div>
      </div>
    </div>
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
    <script>  document.getElementById('cancelContract').addEventListener('click', function() {
        window.location.href = 'Contracts.php';
        });</script>
    
</body>

</html>
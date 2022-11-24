let addEmployeeModal = $("#createDetails");
let editEmployeeModal = $("#editDetails");
let addDepartmentModal = $("#createDepo");
let editDepartmentModal = $("#editDepo");
let addLocationModal = $("#createLocation");
let updateLocationModal = $("#updateLocation");


$(window).on("load", function() {
    $("#preloader").fadeOut(10000);
    showAllEmployees();
    showDepartments();
    showLocations();
});

// Location Seaach 
$('#select-locations').on("click", function () {
    let value = $('#select-locations option:selected').val();

        $.ajax({
            url: 'libs/php/SearchLocation.php',
            type: 'POST',
            dataType: 'json',
            data: {
                name: value
            },
            success: function(result) {
                
                if(result.status.name == "ok"){
                
                 const employees = result.data;
                let employeeTable = $("#employeeTbody");
                employeeTable.html("");
                let totalEntries = $("#total-entries");
                employees.forEach(employee => {
                    employeeTable.append($(`<tr role="button" data-id="${employee.id}">
                                                <td>${employee.firstName}</td>
                                                <td>${employee.lastName}</td>
                                                <td>${employee.department}</td>
                                                <td>${employee.location}</td>
                                            </tr>`
                                          ));
               const totalRows = $("#employeeTbody tr:visible").length;
                totalEntries.html($(`<h5>${totalRows} employees</h5>`));
            });
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }  
     })
});


// depo search
$('#select-departments').on("click", function () {
    let value = $('#select-departments option:selected').val();

        $.ajax({
            url: 'libs/php/SearchDepo.php',
            type: 'POST',
            dataType: 'json',
            data: {
                name: value
            },
            success: function(result) {
                
                if(result.status.name == "ok"){
                
                 const employees = result.data;
                let employeeTable = $("#employeeTbody");
                employeeTable.html("");
                let totalEntries = $("#total-entries");
                employees.forEach(employee => {
                    employeeTable.append($(`<tr role="button" data-id="${employee.id}">
                                                <td>${employee.firstName}</td>
                                                <td>${employee.lastName}</td>
                                                <td>${employee.department}</td>
                                                <td>${employee.location}</td>
                                            </tr>`
                                          ));
               const totalRows = $("#employeeTbody tr:visible").length;
                totalEntries.html($(`<h5>${totalRows} employees</h5>`));
            });
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }  
     })
});
               

// depo search
$('#search-input').change(function () {
    let values = $('#search-input').val();
    let operand = '%';
    let res = values.concat(operand);
    
        $.ajax({
            url: 'libs/php/SearchName.php',
            type: 'POST',
            dataType: 'json',
            data: {
                name: values
            },
            success: function(result) {
                
                if(result.status.name == "ok"){
                
                 const employees = result.data;
                let employeeTable = $("#employeeTbody");
                employeeTable.html("");
                let totalEntries = $("#total-entries");
                employees.forEach(employee => {
                    employeeTable.append($(`<tr role="button" data-id="${employee.id}">
                                                <td>${employee.firstName}</td>
                                                <td>${employee.lastName}</td>
                                                <td>${employee.department}</td>
                                                <td>${employee.location}</td>
                                            </tr>`
                                          ));
               const totalRows = $("#employeeTbody tr:visible").length;
                totalEntries.html($(`<h5>${totalRows} employees</h5>`));
            });
          }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }  
     })
});


// Get All Employees, Departments, Locations
function showAllEmployees() {
    $.ajax({
        url: "libs/php/getAll.php",
        type: 'GET',
        dataType: 'json',
        success: function(result) {

            if (result.status.name == "ok") {    

                const employees = result.data;
                let employeeTable = $("#employeeTbody");
                employeeTable.html("");
                let totalEntries = $("#total-entries");
                employees.forEach(employee => {
                    employeeTable.append($(`<tr role="button" data-id="${employee.id}">
                                                <td>${employee.firstName}</td>
                                                <td>${employee.lastName}</td>
                                                <td>${employee.department}</td>
                                                <td>${employee.location}</td>
                                            </tr>`));
                });   
                const totalRows = $("#employeeTbody tr:visible").length;
                totalEntries.html($(`<h5>${totalRows} employees</h5>`));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

function showDepartments() {
    $.ajax({
        url: "libs/php/getAllDepartments.php",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            
            if (result.status.name == "ok") {
                const departments = result.data;
                let selectDepartment = $("#select-departments");
                selectDepartment.html("");
                let departmentDetailCard = $("#departments-cards");
                departmentDetailCard.html("");
                let addEmployeeDepartmentSelect = $("#addEmployeeDepartmentSelect");
                addEmployeeDepartmentSelect.html("");
                let editEmployeeDepartmentSelect = $("#editEmployeeDepartmentSelect");
                editEmployeeDepartmentSelect.html("");
                departments.forEach(department => {
                    selectDepartment.append($(`<option value="${department.id}">${department.name}</option>`));
                    departmentDetailCard.append($(`<div id="department-details-card" class="department-details-card">
                                                        <div class="card-body">
                                                            <h6 class="card-title department-name text-center mb-3"><strong>${department.name}</strong></h6>
                                                            <table class="dept-table table justify-content-between">
                                                                <tbody id="dept-tbody">
                                                                        <tr>
                                                                            <td><i class='fa-solid fa-map-pin' title='Location'></i></td>
                                                                            <td class="h6 align-middle text-end">${department.location}</td>    
                                                                        </tr>
                                                                </tbody>
                                                            </table> 
                                                            <div class="text-center">
                                                                <button id="dept-pencil-edit" class="btn updateDepartmentIcon" type="button"
                                                                    data-departmentid="${department.id}"
                                                                    data-name="${department.name}"
                                                                    data-location="${department.location}"
                                                                    data-locationID="${department.locationID}">
                                                                    <i class='fa-solid fa-pen' title="Edit"></i>
                                                                </button>
                                                                <button id="dept-bin-delete" class="btn deleteDepartmentIcon" type="button" data-departmentid="${department.id}">
                                                                    <i class='fa-solid fa-trash' title="Delete"></i>
                                                                </button>
                                                            </div>  
                                                        </div>    
                                                    </div>`));
                    addEmployeeDepartmentSelect.append($(`<option data-departmentid="${department.id}" value="${department.locationID}">${department.name}</option>`));
                    editEmployeeDepartmentSelect.append($(`<option data-departmentid="${department.id}" value="${department.locationID}">${department.name}</option>`));
                });
                selectDepartment.prepend($(`<option selected disabled value="0">Search by Department</option>`));
                addEmployeeDepartmentSelect.prepend($(`<option selected disabled value="0">Select a Department</option>`));
                editEmployeeDepartmentSelect.prepend($(`<option value="0"></option>`));
                $(".updateDepartmentIcon").on("click", function() {
                    let id = $(this).attr("data-locationid");
                    let name = $(this).attr("data-name");
                    let locationName = $(this).attr("data-location");
                    let locationID = $(this).attr("data-locationID");
                    
                    $("#id_ud").val(id);
                    $("#departmentName_ud").val(name);
                    $("#editDepartmentLocationSelect option:first").replaceWith(($(`<option selected disabled value="${locationID}">${locationName}</option>`))); 
                    
                    editDepartmentModal.modal("show");
                    $("#editDepartmentForm").validate().resetForm();
                    $("#updateDepo").attr("disabled", true);
                    $("#checkConfirmEditDepartment").prop("checked", false);    
                });
                $(".deleteDepartmentIcon").on("click", function() {
                    let id = $(this).attr("data-departmentid");
                    $("#id_dd").val(id);
                    $("#deleteDepartmentModal").modal("show");
                });   
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}

function showLocations() {
    $.ajax({
        url: "libs/php/getAllLocations.php",
        type: 'GET',
        dataType: 'json',
        success: function(result) {
            
            if (result.status.name == "ok") {
                const locations = result.data;
                let selectLocation = $("#select-locations");
                selectLocation.html("");
                let locationDetailCard = $("#locations-cards");
                locationDetailCard.html("");
                let addEmployeeLocationSelect = $("#addEmployeeLocationSelect");
                addEmployeeLocationSelect.html("");
                let editEmployeeLocationSelect = $("#editEmployeeLocationSelect");
                editEmployeeLocationSelect.html("");
                let editDepartmentLocationSelect = $("#editDepartmentLocationSelect");
                editDepartmentLocationSelect.html("");
                let addDepartmentLocationSelect = $("#addDepartmentLocationSelect");
                addDepartmentLocationSelect.html("");
                locations.forEach(location => {
                    selectLocation.append($(`<option value="${location.id}">${location.name}</option>`));
                    locationDetailCard.append($(`<div id="location-details-card" class="location-details-card">
                                                        <div class="card-body">
                                                            <h5 class="card-title location-name text-center mb-3"><strong>${location.name}</strong></h5>
                                                            <div class="text-center">

                                                                <button id="append-pen " class="btn editLocationIcon" type="button" data-id="${location.id}">
                                                                    <i class='fa-solid fa-pen' title="Delete"></i>
                                                                </button>
                                                                    
                                                                <button id="append-bin-delete" class="btn deleteLocationIcon" type="button" data-id="${location.id}">
                                                                    <i class='fa-solid fa-trash' title="Delete"></i>
                                                                </button>
                                                            </div>  
                                                        </div>    
                                                    </div>`));
                    addEmployeeLocationSelect.append($(`<option value="${location.id}">${location.name}</option>`));
                    editEmployeeLocationSelect.append($(`<option value="${location.id}">${location.name}</option>`));
                    editDepartmentLocationSelect.append($(`<option value="${location.id}">${location.name}</option>`));
                    addDepartmentLocationSelect.append($(`<option value="${location.id}">${location.name}</option>`));                           
                });
                selectLocation.prepend($(`<option selected disabled value="0">Search by Location</option>`));
                addEmployeeLocationSelect.prepend($(`<option selected disabled value="0"></option>`));
                editEmployeeLocationSelect.prepend($(`<option value="0"></option>`));
                editDepartmentLocationSelect.prepend($(`<option value="0"></option>`));
                addDepartmentLocationSelect.prepend($(`<option selected disabled value="0">Select Location</option>`));
                $(".deleteLocationIcon").on("click", function() {
                    let id = $(this).attr("data-id");
                    $("#id_dl").val(id);
                    $("#deleteLocation").modal("show");
                });  
                
                
                $(".editLocationIcon").on("click", function() {
                    let id = $(this).attr("data-id");

                    $("#id_udu").val(id);
                    $("#locationName_ud").val(name);
                    $("#updateLocation").modal('show');
                    
                    $("#updateLocationForm").validate().resetForm();
                    $("#updateLocationBtn").attr("disabled", true);
                    $("#checkConfirmUpdateLocation").prop("checked", true);
                });
            }          
                
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
}


// ---====== EMPLOYEES =====---

$("#btn-employees").on("click", function() {
    $(this).addClass("itsLive");
    $("#btn-departments").removeClass("itsLive");
    $("#btn-locations").removeClass("itsLive");
    $("#total-employees").removeClass("d-none");
    $("#all-departments").addClass("d-none");
    $("#all-locations").addClass("d-none");
    $(".navbar-collapse.show").collapse("hide");
    showAllEmployees();
});

// On click table row - Open personnel details
$(".table").on("click", "tr[role='button']", function() {
        let id = $(this).attr("data-id");
		
    $.ajax({
        url: "libs/php/getPersonnel.php",
        type: 'POST',
        dataType: 'json',
        data: {
            id: id
        },
        success: function(result) {
                
            console.log("Testing " + result.status.name);
            if (result.status.name == "ok") {
                let employee = result.data[0];
                let edContent = $("#ed-content");
                edContent.html("");
                edContent.html($(`  <div class="modal-header">
                                        <button type="button" id="edited-left-arrow" class="btn" title="Back" data-bs-dismiss="modal" aria-label="Close"><i class='fa-solid fa-arrow-left-long'></i></button>
                                        <h4 class="modal-title" id="viewEmployeeModalLabel">Employee Details</h4>
                                    </div>
                                    <div class="modal-body">
                                        <div class="container-details container justify-content-center" >
                                            <div class="employee-details-card card p-2">
                                                <div class="card-body d-flex justify-content-center" id="edited-name">
                                                    <h3 class="card-title p-2 "><strong>${employee.firstName}</strong></h3>
                                                    <h3 class="card-title p-2"><strong>${employee.lastName}</strong></h3>
                                                </div>
                                                <div class="d-flex justify-content-center mt-3">
                                                    <table class="ed-table table justify-content-between table-responsive">
                                                        <tbody id="edited-tbody">
                                                                <tr>
                                                                    <td><i class='fa-solid fa-briefcase' title='Job Title'></i></td>
                                                                    <td class="align-middle text-end">${employee.jobTitle}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td><a href="mailto:${employee.email}"><i class='fa-solid fa-envelope' title='Send Email'></a></i></td>
                                                                    <td class="align-middle text-end">${employee.email}</td>    
                                                                </tr>
                                                                <tr>
                                                                    <td><i class='fa-solid fa-building' title='Department'></i></td>
                                                                    <td class="align-middle text-end">${employee.department}</td>    
                                                                </tr>
                                                                <tr>
                                                                    <td><i class='fa-solid fa-map' title='Location'></i></td>
                                                                    <td class="align-middle text-end">${employee.location}</td>    
                                                                </tr>
                                                        </tbody>
                                                    </table>   
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modal-footer justify-content-center">
                                        <button id="edited-pencil-edit" class="btn editE" type="button"
                                                data-id="${employee.id}"
                                                data-firstName="${employee.firstName}" 
                                                data-lastName="${employee.lastName}"
                                                data-jobTitle="${employee.jobTitle}" 
                                                data-email="${employee.email}" 
                                                data-department="${employee.department}"
                                                data-departmentid="${employee.departmentID}"
                                                data-location="${employee.location}"
                                                data-locationID="${employee.locationID}">
                                            <i class='fa-solid fa-pen' title="Edit"></i>
                                        </button>
                                        <button id="edited-bin-delete" class="btn deleteE" type="button" data-id="${employee.id}">
                                            <i class='fa-solid fa-trash' title="Delete"></i>
                                        </button>
                                    </div>`));

                $(".editE").on("click", function() {
                    let id = $(this).attr("data-id");
                    let firstName=$(this).attr("data-firstName");
                    let lastName=$(this).attr("data-lastName");
                    let jobTitle=$(this).attr("data-jobTitle");
                    let email=$(this).attr("data-email");
                    let department=$(this).attr("data-department");
                    let departmentID=$(this).attr("data-departmentid");
                    let location=$(this).attr("data-location");
                    let locationID=$(this).attr("data-locationID");
                 
                    $("#id_u").val(id);
                    $("#firstName_u").val(firstName);
                    $("#lastName_u").val(lastName);
                    $("#jobTitle_u").val(jobTitle);
                    $("#email_u").val(email);
                   
                    $("#editEmployeeDepartmentSelect option:first").replaceWith($(`<option selected disabled data-departmentid="${departmentID}" value="${locationID}">${department}</option>`));
                    $("#editEmployeeLocationSelect option:first").replaceWith(($(`<option selected value="${locationID}">${location}</option>`))); 
                    
                    editEmployeeModal.modal("show");
                    $("#viewEmployeeModal").modal("hide");
                    $("#editEmployeeForm").validate().resetForm();
                    $("#updateEmployeeBtn").attr("disabled", true);
                    $("#checkConfirmEditEmployee").prop("checked", false);
                });
                $(".deleteE").on("click", function() {
                    let id = $(this).attr("data-id");
                    $("#id_d").val(id);
                    $("#deleteEmployeeModal").modal("show");
                    $("#viewEmployeeModal").addClass("dm-overlay");
                });    
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
    $("#viewEmployeeModal").modal("show");  
});

// Validation Add & Edit Employee Form
$("#addEmployeeForm, #editEmployeeForm").each(function() {
    $(this).validate({
        rules: {
            firstName: "required",
            lastName: "required",
            email: {
            required: true,
            email: true
            },
            jobTitle: "required",
        },
        messages: {
            firstName: "First Name field cannot be blank!",
            lastName: "Last Name field cannot be blank!",
            email: "Please enter a valid email address",
            jobTitle: "Job Title field cannot be blank! ",
        }
    });
});

// Routine for dependent select options of Add Employee Form
$("#addEmployeeDepartmentSelect").change(function() {
    $("#addEmployeeLocationSelect option").hide();
    $("#addEmployeeLocationSelect option[value='" + $(this).val() + "']").show();
    
    if ($("#addEmployeeLocationSelect option[value='" + $(this).val() + "']").length) {
        $("#addEmployeeLocationSelect option[value='" + $(this).val() + "']").first().prop("selected", true);
    }
    else {
      $("#addEmployeeLocationSelect").val("");
    }
});

// check Form Add Employee
$("#checkConfirmAddEmployee").click(function() {
    if ($("#addEmployeeForm").valid() && $(this).is(":checked")) {
        $("#employeeConfirmAddBtn").attr("disabled", false);
    } else {
        $("#employeeConfirmAddBtn").attr("disabled", true);
        $("#checkConfirmAddEmployee").prop("checked", false);
    }
    $("#firstNameInput, #lastNameInput, #jobTitleInput, #emailInput").keyup(function() {
        let fName = $("#firstNameInput").val();
        let lName = $("#lastNameInput").val();
        let job = $("#jobTitleInput").val();
        let email = $("#emailInput").val();
        if (fName === "" || lName === "" || job === "" || email === "") {
            $("#employeeConfirmAddBtn").attr("disabled", true);
            $("#checkConfirmAddEmployee").prop("checked", false);
        }
    });   
});

// Add Employee 
$("#add-employee").click(function() {
    addEmployeeModal.modal("show");
    resetModal(addEmployeeModal);
    $("#addEmployeeForm").validate().resetForm();
    $("#employeeConfirmAddBtn").attr("disabled", true);
});

$("#employeeConfirmAddBtn").click(function(e) {
    e.preventDefault();
    
    $.ajax({
        url: "libs/php/insertDetails.php",
        type: 'POST',
        dataType: 'json',
        data: {
            firstName: toTitleCase($("#firstNameInput").val()),
            lastName: toTitleCase($("#lastNameInput").val()),
            jobTitle: toTitleCase($("#jobTitleInput").val()),
            email: $("#emailInput").val().toLowerCase(),
            departmentID: $("#addEmployeeDepartmentSelect :selected").data("departmentid")
        },
        beforeSend: function() {
            $("#loader").removeClass("hidden");
        },
        success: function(result) {
            
            if (result.status.name == "ok") {
                addEmployeeModal.modal("hide");
                showAllEmployees();
            }
        },
        complete: function() {
            $("#loader").addClass("hidden");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
});

// Routine for dependent select options of Edit Employee Form
$("#editEmployeeDepartmentSelect").change(function() {
    $("#editEmployeeLocationSelect option").hide();
    $("#editEmployeeLocationSelect option[value='" + $(this).val() + "']").show();
    
    if ($("#editEmployeeLocationSelect option[value='" + $(this).val() + "']").length) {
        $("#editEmployeeLocationSelect option[value='" + $(this).val() + "']").first().prop("selected", true);
    }
    else {
      $("#editEmployeeLocationSelect").val("");
    }
});

// check Form Edit Employee
$("#checkConfirmEditEmployee").click(function() {
    if ($("#editEmployeeForm").valid() && $(this).is(":checked")) {
        $("#updateEmployeeBtn").attr("disabled", false);
    } else {
        $("#updateEmployeeBtn").attr("disabled", true);
        $("#checkConfirmEditEmployee").prop("checked", false);
    }
    $("#firstName_u, #lastName_u, #jobTitle_u, #email_u").keyup(function() {
        let fName = $("#firstName_u").val();
        let lName = $("#lastName_u").val();
        let job = $("#jobTitle_u").val();
        let email = $("#email_u").val();
        if (fName === "" || lName === "" || job === "" || email === "") {
            $("#updateEmployeeBtn").attr("disabled", true);
            $("#checkConfirmEditEmployee").prop("checked", false);
        }
    });
});

// EDIT - UPDATE Employee 
$("#updateEmployeeBtn").on("click", function(e) {
    e.preventDefault();
    let id = $("#id_u").val();
    let departmentID = $("#editEmployeeDepartmentSelect :selected").data("departmentid");
   
    $.ajax({
        url: "libs/php/updateDetails.php",
        type: 'POST',
        dataType: 'json',
        data: {
            firstName: toTitleCase($("#firstName_u").val()),
            lastName: toTitleCase($("#lastName_u").val()),
            jobTitle: toTitleCase($("#jobTitle_u").val()),
            email: $("#email_u").val().toLowerCase(),
            departmentID: departmentID,
            id: id
        },
        beforeSend: function() {
            $("#loader").removeClass("hidden");
        },
        success: function(result) {
            
            if (result.status.name == "ok") {
                editEmployeeModal.modal("hide");
                $("#viewEmployeeModal").modal("hide");   
                showAllEmployees();
            }
        },
        complete: function() {
            $("#loader").addClass("hidden");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
    
});

// DELETE Employee
$("#checkConfirmDeleteEmployee").click(function() {
    if ($(this).is(":checked")) {
        $("#deleteEmployeeBtn").attr("disabled", false);
    } else {
        $("#deleteEmployeeBtn").prop("disabled", true);
    }   
});

$("#deleteEmployeeModal").on("hidden.bs.modal", function() {
    if($("#checkConfirmDeleteEmployee").is(":checked")) {
        $("#deleteEmployeeBtn").attr("disabled", true);
        $(this).find("form").trigger("reset");
    }
    $("#viewEmployeeModal").removeClass("dm-overlay");
});

$("#deleteEmployeeBtn").on("click", function(e) {
    e.preventDefault();
    let id = $("#id_d").val();

    $.ajax({
        url: "libs/php/deleteDetails.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            id: id
        },
        beforeSend: function() {
            $("#loader").removeClass("hidden");
        },
        success: function(result) {
            
            if (result.status.name == "ok") {
                $('#deleteEmployeeModal').modal("hide");
                $("#viewEmployeeModal").modal("hide");
                showAllEmployees();
            }
        },
        complete: function() {
            $("#loader").addClass("hidden");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
});


// ---====== DEPARTMENTS =====---

$("#btn-departments").on("click", function() {
    $(this).addClass("itsLive");
    $("#btn-employees").removeClass("itsLive");
    $("#btn-locations").removeClass("itsLive");
    $("#all-departments").removeClass("d-none");
    $("#total-employees").addClass("d-none");
    $("#all-locations").addClass("d-none");
    $(".navbar-collapse.show").collapse("hide");
});

// Validation Add & Edit Department Form
$("#addDepartmentForm, #editDepartmentForm ").each(function() {
    $(this).validate({
        rules: {
            departmentName: "required"
        },
        messages: {
            departmentName: "Department Name field cannot be empty!"
        }
    });
});

// Check Form Add Department
$("#checkConfirmAddDepartment").click(function() {
    if ($("#addDepartmentForm").valid() && $(this).is(":checked")) {
        $("#addDepartmentBtn").attr("disabled", false);
    } else {
        $("#addDepartmentBtn").attr("disabled", true);
        $("#checkConfirmAddDepartment").prop("checked", false);
    }
    $("#departmentName_addd").keyup(function() {
        if ($(this).val() === "") {
            $("#checkConfirmAddDepartment").prop("checked", false);
            $("#addDepartmentBtn").attr("disabled", true);
        }
    });
});

// ADD Department
$("#add-department").click(function() {
    addDepartmentModal.modal("show");
    resetModal(addDepartmentModal);
    $("#addDepartmentForm").validate().resetForm();
    $("#addDepartmentBtn").attr("disabled", true);
});

$("#addDepartmentBtn").on("click", function(e) {
    e.preventDefault();
    let locationID = $("#addDepartmentLocationSelect :selected").val();

    $.ajax({
        url: "libs/php/insertDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: toTitleCase($("#departmentName_addd").val()),
            locationID: locationID
        },
        beforeSend: function() {
            $("#loader").removeClass("hidden");
        },
        success: function(result) {
            
            if (result.status.name == "ok") {
                addDepartmentModal.modal("hide");
                showDepartments(); 
            }
        },
        complete: function() {
            $("#loader").addClass("hidden");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
});

// Check Form Edit Department
$("#checkConfirmEditDepartment").click(function() {
    if ($("#editDepartmentForm").valid() && $(this).is(":checked")) {
        $("#updateDepo").attr("disabled", false);
    } else {
        $("#updateDepo").attr("disabled", true);
        $("#checkConfirmEditDepartment").prop("checked", false);
    }
    $("#departmentName_ud").keyup(function() {
        if ($(this).val() === "") {
            $("#updateDepo").attr("disabled", true);
            $("#checkConfirmEditDepartment").prop("checked", false);
        }
    });
});

// EDIT - UPDATE Department
$("#updateDepo").on("click", function(e) {
    e.preventDefault();
    let id = $("#id_ud").val();
    let locationID = $("#editDepartmentLocationSelect :selected").val();
   
    $.ajax({
        url: "libs/php/updateDepo.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: toTitleCase($("#departmentName_ud").val()),
            locationID: locationID,
            id: id
        },
        beforeSend: function() {
            $("#loader").removeClass("hidden");
        },
        success: function(result) {
            
            if (result.status.name == "ok") {
                editDepartmentModal.modal("hide");
                showDepartments();
            }
        },
        complete: function() {
            $("#loader").addClass("hidden");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
    
});

// DELETE Department
$("#checkConfirmDeleteDepartment").click(function() {
    if ($(this).is(":checked")) {
        $("#deleteDepartmentBtn").attr("disabled", false);
    } else {
        $("#deleteDepartmentBtn").prop("disabled", true);
    }   
});

$("#deleteDepartmentModal").on("hidden.bs.modal", function() {
    if($("#checkConfirmDeleteDepartment").is(":checked")) {
        $("#deleteDepartmentBtn").attr("disabled", true);
        $(this).find("form").trigger("reset");
    }
});

$("#deleteDepartmentBtn").on("click", function(e) {
    e.preventDefault();
    let id = $("#id_dd").val();

    $.ajax({
        url: "libs/php/deleteDepartment.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            id: id
        },
        beforeSend: function() {
            $("#loader").removeClass("hidden");
        },
        success: function(result) {
            
            if (result.status.name == "ok") {
                $("#deleteDepartmentModal").modal("hide");
                showDepartments();
            }
            if (result.status.name == "forbidden") {
                $("#deleteDepartmentModal").modal("hide");
                $("#forbiddenDepartmentModal").modal("show");
            }
        },
        complete: function() {
            $("#loader").addClass("hidden");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
});


// ---====== LOCATIONS =====---

$("#btn-locations").on("click", function() {
    $(this).addClass("itsLive");
    $("#btn-employees").removeClass("itsLive");
    $("#btn-departments").removeClass("itsLive");
    $("#all-locations").removeClass("d-none");
    $("#all-departments").addClass("d-none");
    $("#total-employees").addClass("d-none");
    $(".navbar-collapse.show").collapse("hide");
});

// Validation Add Location
$("#addLocationForm, updateLocationForm").validate({
    rules: {
        locationName: "required"
      },
      messages: {
        locationName: "Location Name field cannot be empty!"
      }
});

// Check Form Add Location
$("#checkConfirmAddLocation").click(function() {
    if ($("#addLocationForm").valid() && $(this).is(":checked")) {
        $("#addLocationBtn").attr("disabled", false);
    } else {
        $("#addLocationBtn").attr("disabled", true);
        $("#checkConfirmAddLocation").prop("checked", false);
    }
    $("#locationName_addl").keyup(function() {
        if ($(this).val() === "") {
            $("#checkConfirmAddLocation").prop("checked", false);
            $("#addLocationBtn").attr("disabled", true);
        }
    })
});

// ADD Location
$("#add-location").click(function() {
    addLocationModal.modal("show");
    resetModal(addLocationModal);
    $("#addLocationForm").validate().resetForm();
    $("#addLocationBtn").attr("disabled", true);
});

$("#addLocationBtn").on("click", function(e) {
    e.preventDefault();
    
    $.ajax({
        url: "libs/php/insertLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: toTitleCase($("#locationName_addl").val()),
        },
        beforeSend: function() {
            $("#loader").removeClass("hidden");
        },
        success: function(result) {
            
            if (result.status.name == "ok") {
                addLocationModal.modal("hide");  
                showLocations();  
            }
        },
        complete: function() {
            $("#loader").addClass("hidden");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
});








// Check Form Edit Location
$("#checkConfirmUpdateLocation").click(function() {
    if ($("#updateLocationForm").valid() && $(this).is(":checked")) {
        $("#updateLocationBtn").attr("disabled", false);
    } else {
        $("#updateLocationBtn").attr("disabled", true);
        $("#checkConfirmUpdateLocation").prop("checked", false);
    }
    $("#uid_ud").keyup(function() {
        if ($(this).val() === "") {
            $("#updateLocationBtn").attr("disabled", true);
            $("#checkConfirmUpdateLocation").prop("checked", false);
        }
    });
})

// EDIT - UPDATE Location
$("#updateLocationBtn").on("click", function(e) {
    e.preventDefault();
    let id = $("#id_udu").val();
   
    $.ajax({
        url: "libs/php/updateLocation.php",
        type: 'POST',
        dataType: 'json',
        data: {
            name: toTitleCase($("#uid_ud").val()),
            id: id
        },
        beforeSend: function() {
            $("#loader").removeClass("hidden");
        },
        success: function(result) {
            
            if (result.status.name == "ok") {
                updateLocationModal.modal("hide");
                showLocations();
            }
        },
        complete: function() {
            $("#loader").addClass("hidden");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
    
});




// DELETE Location
$("#checkConfirmDeleteLocation").click(function() {
    if ($(this).is(":checked")) {
        $("#deleteLocationBtn").attr("disabled", false);
    } else {
        $("#deleteLocationBtn").prop("disabled", true);
    }   
});

$("#deleteLocation").on("hidden.bs.modal", function() {
    if($("#checkConfirmDeleteLocation").is(":checked")) {
        $("#deleteLocationBtn").attr("disabled", true);
        $(this).find("form").trigger("reset");
    }
});

$("#deleteLocationBtn").on("click", function(e) {
    e.preventDefault();
    let id = $("#id_dl").val();

    $.ajax({
        url: "libs/php/deleteLocation.php",
        type: 'POST',
        dataType: 'json',
        data: { 
            id: id
        },
        beforeSend: function() {
            $("#loader").removeClass("hidden");
        },
        success: function(result) {
            
            if (result.status.name == "ok") {
                $("#deleteLocation").modal("hide");
                showLocations();
            }

            if (result.status.name == "forbidden") {
                $("#deleteLocation").modal("hide");
                $("#forbiddenLocationModal").modal("show");
            }
        },
        complete: function() {
            $("#loader").addClass("hidden");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
        }
    });
});






// Capitalize first letters
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Resets Modal
function resetModal(modalName) {
    modalName.on("hidden.bs.modal", function () {
        $(this).find("form").trigger("reset");
    })
}

// Back to top button
let backToTop = $(".back-to-top");
if (backToTop) {
    const toggleBacktotop = () => {
        if (window.scrollY > 100) {
            backToTop.addClass("active");
        } else {
            backToTop.removeClass("active");
        }
    }
$(window).scroll(toggleBacktotop);
}

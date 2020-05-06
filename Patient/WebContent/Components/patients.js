//CLIENTMODEL=========================================================================
function validateItemForm()
{
	// first Name
	if ($("#patientFName").val().trim() == "")
	{
		return "Insert patient first name.";
	}
	
	//validate patient first name
	var tmpName1=$("#patientFName").val().trim();
	var tmpName2=/^[ a-zA-Z]+$/;
	if (!tmpName2.test(tmpName1))
	 {
		return "Patient first name cannot contain numbers or symbols.";
	 }
	
	// Last NAME
	if ($("#patientLName").val().trim() == "")
	 {
		return "Insert patient last Name.";
	 } 
	
	//validate patient last name
	var tmpName3=$("#patientLName").val().trim();
	var tmpName4=/^[ a-zA-Z]+$/;
	if (!tmpName4.test(tmpName3))
	 {
		return "Patient last name cannot contain numbers or symbols..";
	 }
	
	// Age -------------------------------
	if ($("#patientAge").val().trim() == "")
	 {
		return "Insert patient Age.";
	 }
	
	// check if Age is numerical value
	var tmpAge = $("#patientAge").val().trim();
	if (!$.isNumeric(tmpAge))
	 {
		return "Please insert a numerical value for patient age.";
	 }
	
	 
	// Address------------------------
	if ($("#patientAddress").val().trim() == "")
	 {
		return "Insert patient address.";
	 }
	
	// Contact Number------------------------
	if ($("#patientPhone").val().trim() == "")
	 {
		return "Insert patient contact no.";
	 }
	
	
	var tmpPrice2 = $("#patientPhone").val().trim();
	if (!$.isNumeric(tmpPrice2))
	 {
		return "Please insert a numerical value for patient contact number.";
	 }
	
	//validate patient contact number length
//	var tmpCode5 =$("#patientPhone").val().trim().length;
//	if (tmpCode5=10)
//	{
//		return "Contact number length is not valid.";
//	}
	
	
	
	return true;
}

$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

// SAVE ============================================
$(document).on("click", "#btnSave", function(event) {
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
	
	// Form validation-------------------
	var status = validateItemForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid-------------------------
//	$("#formItem").submit();
	var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
			 url : "PatientsAPI",
			 type : type,
			 data : $("#formItem").serialize(),
			 dataType : "text",
			 complete : function(response, status)
			 {
				 onItemSaveComplete(response.responseText, status);
			 }
	});
});

function onItemSaveComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
		{
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error")
	{
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else
	{
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidItemIDSave").val("");
	$("#formItem")[0].reset();
}



//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	 $("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val());
	 $("#patientFName").val($(this).closest("tr").find('td:eq(0)').text());
	 $("#patientLName").val($(this).closest("tr").find('td:eq(1)').text());
	 $("#patientAge").val($(this).closest("tr").find('td:eq(2)').text());
	 $("#patientAddress").val($(this).closest("tr").find('td:eq(3)').text());
	 $("#patientPhone").val($(this).closest("tr").find('td:eq(4)').text());
}); 

//REMOVE==========================================
$(document).on("click", ".btnRemove", function(event)
{
		 $.ajax(
		 {
			 url : "PatientsAPI",
			 type : "DELETE",
			 data : "patientID=" + $(this).data("itemid"),
			 dataType : "text",
			 complete : function(response, status)
			 {
				 onItemDeleteComplete(response.responseText, status);
			 }
		 });
});

function onItemDeleteComplete(response, status)
{
	if (status == "success")
	{
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			 $("#alertSuccess").text("Successfully deleted.");
			 $("#alertSuccess").show();
			 $("#divItemsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
			{
				 $("#alertError").text(resultSet.data);
				 $("#alertError").show();
			}
	} else if (status == "error")
	{
		 $("#alertError").text("Error while deleting.");
		 $("#alertError").show();
	} else
	{
		 $("#alertError").text("Unknown error while deleting..");
		 $("#alertError").show();
	}
}



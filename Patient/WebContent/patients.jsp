<%@page import="model.Patient"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Patient Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/patients.js"></script>
</head>
<body>

<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Patient Management</h1>
				

				<form id="formItem" name="formItem">
					Patient First Name: 
					<input id="patientFName" name="patientFName" type="text" class="form-control form-control-sm"> 
					<br> Patient Last Name:
					<input id="patientLName" name="patientLName" type="text" class="form-control form-control-sm"> 
					<br> Patient Age: 
					<input id="patientAge" name="patientAge" type="text" class="form-control form-control-sm"> 
					<br> Patient Address: 
					<input id="patientAddress" name="patientAddress" type="text" class="form-control form-control-sm"> 
					<br> Patient Contact Number:
					<input id="patientPhone" name="patientPhone" type="text" class="form-control form-control-sm"> 
					<br> 
					<input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary"> 
					<input type="hidden" id="hidItemIDSave" name="hidItemIDSave" value="">
				</form>
				
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>
				
				<br>
				<div id="divItemsGrid">
 				<%
				Patient patObj = new Patient();
 				out.print(patObj.readPatients());
				 %>
				 </div>
			</div>
		</div>
	</div>

</body>
</html>
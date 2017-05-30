var expenseOwnerNames = [ "sidhu", "kumar" ];
var expenseNames = [ "Daily Toll" ];

$(document).ready(function() {

	$("#datepicker").datepicker();

	$("#saveBtn").off();
	$("#saveBtn").on('click', function() {

		var formExpenseData = {};
		formExpenseData.amount = $("#expenseAmount").val();
		formExpenseData.date = new Date($("#datepicker").val());
		formExpenseData.expenseName = $("#expenseName").val();
		formExpenseData.expensePaidBy = $("#expensePaidBy").val();
		formExpenseData.id = 0;

		$.ajax({
			url : "http://localhost:9010/service/createExpense",
			data : JSON.stringify(formExpenseData),
			type : "POST",
			dataType : "json",
			contentType : "application/json",
			success : function(response) {
				alert("Expense Successfully Saved");
				$("#expenseAmount").val("");
				$("#datepicker").val("");
				$("#expenseName").val("");
				$("#expensePaidBy").val("");
				//loadExpenseGrid();
							}

		});

	});

	loadExpenseGrid();

	$("#expensePaidBy").autocomplete({
		source : expenseOwnerNames
	});

	$("#expenseName").autocomplete({
		source : expenseNames
	});
});

function loadExpenseGrid() {

	$.ajax({
		url : "http://localhost:9010/service/listofAllExpenses",
		data : [],
		type : "GET",
		dataType : "json",
		contentType : "application/json",
		success : function(response) {
			$("#expenseTable tbody").empty();
			var table = $("#expenseTable").DataTable();
			table.fnDestroy();
			jQuery.each(response, function(i, expRow) {

				var expenseDate = moment(expRow.date).format("DD-MM-YYYY");

				var expenseRowData = "<tr>" + "<td>" + expRow.expenseName
						+ "</td>" + "<td>" + expenseDate + "</td>" + "<td>"
						+ expRow.expensePaidBy + "</td>" + "<td>"
						+ expRow.amount + "</td>" + "</tr>";

				$("#expenseTable tbody").append(expenseRowData);

			});

			$("#expenseTable").dataTable({
				"scrollY" : 200,
				"scrollCollapse" : true,
				"jQueryUI" : true
			});

		}

	});

}

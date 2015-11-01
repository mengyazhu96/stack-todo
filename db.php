<?php
$conn;
function dbConnect()
{

	$conn = mysqli_connect('127.0.0.1','mysql_user','mysql_password');
	if (!$conn)
	{
		die('Could not connect to Database: ' . mysqli_error());
	}
	echo 'Connected successfully<br />';
}
function dbQuit()
{
	mysqli_close($conn);
}
function dbCreate(){
	$sql = 'CREATE DATABASE TODO';
	$db_selected = mysqli_select_db($conn, 'TODO')
	if ($db_selected){
		echo "Hopefully we break her<br />";
		break;
	}
	$newdb = mysqli_query($conn, $sql);
	if (!$newdb){
		die('Could not create database: ' . mysqli_error());
	}
	echo "Database TODO create successfully\n";
	mysqli_select_db("TODO");
	$sql = "CREATE TABLE todo_tbl( ".
		"todo_id INT NOT NULL AUTO_INCREMENT, ".
		"todo_task VARCHAR(100) NOT NULL, ".
		"todo_importance INT NOT NULL, ".
		"todo_time INT NOT NULL, ".
		"todo_date DATE )";

	$retval = mysqli_query($conn, $sql);
	if (!$retval){
		die('Could not create table: '. mysqli_error());
	}

}	
function dbInsert($task,$importance,$time,$date){
	$sql = "INSERT INTO todo_tbl ".
		"(todo_task, todo_importance, todo_time, todo_date) ".
		"VALUES "/
		"('$task','$todo_importance,'$todo_time','$todo_date')";
	mysqli_select_db($conn,'TODO');
	$retval = mysqli_query( $conn,$sql );
	if(! $retval )
	{
		die('Could not enter data: ' . mysqli_error());
	}	

}
function dbSelect(){
	$sql = "SELECT * FROM todo_tbl";
	mysqli_select_db($conn,'TODO');
	$retval = mysqli_query($conn,$sql);
	if(! $retval )
	{
		die('Could not get data: ' . mysql_error());
	}
	$data = array();
	while ($row= mysqli_fetch_array($result)){
		$data[] = $row;
	}	
	echo json_encode($data);
	mysqli_free_result($retval);

}
function dbDelete($id){
	$sql = "DELETE FROM todo_tbl WHERE tutorial_id=$id";
	mysqli_select_db($conn,'TODO');
	$retval = mysqli_query( $conn,$sql);
	if(!$retval)
	{
		die('Could not get data: ' . mysql_eror());
	}
}
$data = json_decode(file_get_contents("php://input"));

if ($data->query === 'insert'){
	dbConnect();
	dbCreate();
	dbInsert($data->todo_task, $data->todo_importance, $data->todo_time,$data->todo_date);
}
if ($data->query === 'delete'){
	dbDelete($data->todo_id);
}
if ($data->query === 'select'){
	dbConnect();

	dbSelect();
}


?>

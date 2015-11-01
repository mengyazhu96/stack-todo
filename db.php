<?php
$conn;
function dbConnect()
{
	global $conn;
	$conn = mysqli_connect('mysqluser.c7fy9ny964vj.us-west-2.rds.amazonaws.com','mysqluser','mysqlpassword');
	if (!$conn)
	{
		die('Could not connect to Database: ' . mysqli_error($conn));
	}
	echo 'Connected successfully<br />';
}
function dbQuit()
{
	mysqli_close($conn);
}
function dbCreate(){
	global $conn;
	$sql = 'CREATE DATABASE TODO';
	$db_selected = mysqli_select_db($conn, 'TODO');
	if ($db_selected){
		echo "Hopefully we break here<br />";
		return;
	}
	$newdb = mysqli_query($conn, $sql);
	if (!$newdb){
		die('Could not create database: ' . mysqli_error($conn));
	}
	echo "Database TODO create successfully\n";
}
	
function tableCreate(){
	global $conn;
	$todo_tbl = mysqli_real_escape_string($conn, 'todo_tbl');
	if(mysqli_num_rows(mysqli_query($conn, "SHOW TABLES LIKE '$todo_tbl'"))!=1){
		$db_selected = mysqli_select_db($conn,"TODO");
		$sql = "CREATE TABLE todo_tbl( ".
			"todo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, ".
			"todo_task VARCHAR(100) NOT NULL, ".
			"todo_importance INT NOT NULL, ".
			"todo_time INT NOT NULL, ".
			"todo_date DATE)";
		
		$retval = mysqli_query($conn, $sql);
		if (!$retval){
			die('Could not create table: '. mysqli_error($conn));
		}
	}
	return;
}	
function dbInsert($task,$importance,$time,$date){
	global $conn;
	$task1 = mysqli_real_escape_string($conn,$task);
	$importance1 = mysqli_real_escape_string($conn,$importance);
	$time1 = mysqli_real_escape_string($conn,$time);
	$date1 = mysqli_real_escape_string($conn,$date);
	echo "here123";
	$sql = "INSERT INTO todo_tbl ".
		"(todo_task, todo_importance, todo_time, todo_date) 
		VALUES ('$task1', '$importance1', '$time1', '$date1')";
	mysqli_select_db($conn,'TODO');
	$retval = mysqli_query($conn, $sql );
	if(! $retval )
	{
		die('Could not enter data: ' . mysqli_error($conn));
	}	
	echo 'Successfully inserted data';

}
function dbSelect(){
	global $conn;
	$sql = "SELECT todo_id, todo_task, todo_importance, todo_time, todo_date FROM todo_tbl";
	mysqli_select_db($conn,'TODO');
	$retval = mysqli_query($conn,$sql);
	if(! $retval )
	{
		die('Could not get data: ' . mysqli_error($conn));
	}
	$data = array();
	while ($row= mysqli_fetch_array($retval)){
		$data[] = $row;
	
	}	
	echo json_encode($data);
	mysqli_free_result($retval);

}
function dbDelete($id){
	global $conn;
	$sql = "DELETE FROM todo_tbl WHERE todo_id=$id";
	mysqli_select_db($conn,'TODO');
	$retval = mysqli_query( $conn,$sql);
	if(!$retval)
	{
		die('Could not get data: ' . mysqli_error($conn));
	}
	echo "Yay deleted, you're done with it!";
}
$data = json_decode(file_get_contents("php://input"));

if ($data->query === 'insert'){
	dbConnect();
	dbCreate();
	tableCreate();
	$task = $data->todo_task;
	$importance = $data->todo_importance;
	$time = $data->todo_time;
	$date = $data->todo_date;
	dbInsert($task, $importance, $time,$date);
}
if ($data->query === 'delete'){
	dbConnect();
	dbDelete($data->todo_id);
}
if ($data->query === 'select'){
	dbConnect();
	dbSelect();
}


?>

<?php
/*
$dbhost
$dbuser
$dbpass
 */
$conn 
function dbConnect()
{
	$conn = mysql_connect('127.0.0.1','mysql_user','mysql_password');
	if (!$conn)
	{
		die('Could not connect to Database: ' . mysql_error());
	}
	echo 'Connected successfully<br />';
}
function dbQuit()
{
	mysql_close($conn)
}
function dbCreate(){
	$sql = 'CREATE DATABASE TODO';
	$db_selected = mysql_select_db('TODO', $conn);
	if ($db_selected){
		echo "Hopefully we break her<br />";
		break;
	}
	$newdb = mysql_query($sql, $conn);
	if (!retval){
		die('Could not create database: ' . mysql_error());
	}
	echo "Database TODO create successfully\n";
	mysql_select_db("TODO");
	$sql = "CREATE TABLE todo_tbl( ".
		"todo_id INT NOT NULL AUTO_INCREMENT, ".
		"todo_task VARCHAR(100) NOT NULL, ".
		"todo_importance INT NOT NULL, ".
		"todo_time INT NOT NULL, ".
		"todo_date DATE NOT NULL);";

	$retval = mysql_query($sql, $conn);
	if !($retval){
		die('Could not create table: '. mysql_error());
	}

}	
function dbInsert($task,$importance,$time,$date){
	$sql = "INSERT INTO todo_tbl ".
		"(todo_task, todo_importance, todo_time, todo_date) ".
		"VALUES "/
		"('$task','$todo_importance,'$todo_time','$todo_date')";
	mysql_select_db('TODO');
	$retval = mysql_query( $sql, $conn );
	if(! $retval )
	{
		die('Could not enter data: ' . mysql_error());
	}	

}
function dbSelect(){
	$sql = "SELECT * FROM todo_tbl";
	mysql_select_db('TODO');
	$retval = mysql_query( $sql, $conn );
	if(! $retval )
	{
		die('Could not get data: ' . mysql_error());
	}
	return $retval;

}
function dbDelete($id){
	$sql = "DELETE FROM todo_tbl WHERE tutorial_id=$id";
	mysql_select_db('TODO');
	$retval = mysql_query( $sql, $conn);
	if(!$retval)
	{
		die('Could not get data: ' . mysql_eror());
	}
}
$data = json_decode(file_get_contents("php://input"));
if ($data->query === 'insert'){
	dbInsert($data->todo_task, $data->todo_importance, $data->todo_time,$data->todo_date);
}
if ($data->query ==== 'delete'){
	dbDelete($data->todo_id);
}
?>

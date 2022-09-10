<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

function fetch_quaquer_statement($result)
{
    $array = array();

    if ($result instanceof mysqli_stmt) {
        $result->store_result();

        $variables = array();
        $data = array();
        $meta = $result->result_metadata();

        while ($field = $meta->fetch_field())
            $variables[] = &$data[$field->name]; // pass by reference

        call_user_func_array(array($result, 'bind_result'), $variables);

        $i = 0;
        while ($result->fetch()) {
            $array[$i] = array();
            foreach ($data as $k => $v)
                $array[$i][$k] = $v;
            $i++;

            // don't know why, but when I tried $array[] = $data, I got the same one result in all rows
        }
    } elseif ($result instanceof mysqli_result) {
        while ($row = $result->fetch_assoc())
            $array[] = $row;
    }

    return $array;
}
function getUsuarioPorToken()
{
}

header('Access-Control-Allow-Origin: *');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tarefas";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$BASEPATH = "/teste";
$GETS = explode("/", $_SERVER["REQUEST_URI"]);
$recurso = explode("?", $GETS[2])[0];

$res["cod"] = 500;
$res["msgs"] = array();

$USUARIO = null;
if (isset($_COOKIE["usuario"])) {
        $usuarioArray = json_decode($_COOKIE["usuario"], true);

        $stmt = $conn->prepare("SELECT *  FROM usuarios WHERE UsuariosEmail = ? AND UsuariosToken = ? AND UsuariosStatus = 'A'");
        $stmt->bind_param("ss", $usuarioArray["email"], $usuarioArray["token"]);
        $stmt->execute();

        $bdRes = fetch_quaquer_statement($stmt);
        if (count($bdRes) > 0) {
            $USUARIO = $bdRes[0];
        } /*else {echo "definido";
            $res["cod"] = 403;
            $res["msgs"] = [["titulo" => "Login", "msg" => "Token inválido!"]];
            die;
        }*/
}

switch ($recurso) {
    case 'usuario':
        include 'Controladores/Usuarios.php';
        break;
    case 'subcategoria':
        if (isset($USUARIO)) {
            include 'Controladores/Subcategorias.php';
        } else {
            $res["msgs"] = [["titulo" => "Login", "msg" => "Token inválido!"]];
        }
        break;
    case 'tarefa':
        if (isset($USUARIO)) {
            include 'Controladores/Tarefas.php';
        } else {
            $res["msgs"] = [["titulo" => "Login", "msg" => "Token inválido!"]];
        }
        break;
    case 'relsubcattarefa':
        if (isset($USUARIO)) {
            include 'Controladores/RelSubCatTarefa.php';
        } else {
            $res["msgs"] = [["titulo" => "Login", "msg" => "Token inválido!"]];
        }
        break;
    case 'categoria':
        if (isset($USUARIO)) {
            include 'Controladores/Categorias.php';
        } else {
            $res["msgs"] = [["titulo" => "Login", "msg" => "Token inválido!"]];
        }
        break;
    case 'subcategoria':
        if (isset($USUARIO)) {
            include 'Controladores/Subcategorias.php';
        } else {
            $res["msgs"] = [["titulo" => "Login", "msg" => "Token inválido!"]];
        }
        break;
    case 'tipo':
        include 'Controladores/Tipos.php';
        break;
    case 'diassemana':
        include 'Controladores/DiasSemanas.php';
        break;
    case 'prioridade':
        include 'Controladores/Prioridades.php';
        break;
}

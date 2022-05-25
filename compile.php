<?php
// Schoology Minus compiler.
// Works on PHP >7.4.29.
function starts( $haystack, $needle ) {
    $length = strlen( $needle );
    return substr( $haystack, 0, $length ) === $needle;
}
?>
Using file: template.js
<?php 
$template = explode("\n", file_get_contents('template.js'));
foreach ($template as &$line) {
    $line = trim($line, "\r");
}
foreach ($template as $number => &$line) {
    ?>Read line <?php echo $number; 
    echo "\n";
    if (starts($line, '$')) {
        ?>Special variable detected: <?php echo strtolower(substr($line, 1));  
        if (file_exists("files/" . strtolower(substr($line, 1)))) {
            echo "\nFile found! Including...";
            $line = file_get_contents("files/" . strtolower(substr($line, 1)));
        } else {
            echo "\nTemplate not found. Make sure it is in the files/ directory and its filename is all lowercase.";
            $line = "/* COMPILE WARNING: File not found: " . "files/" . strtolower(substr($line, 1)) . " */";
        }
        echo "\n";
    }
}
fwrite(fopen('schoology-.user.js', 'w+'), implode("\n", $template));
?>

Complete!

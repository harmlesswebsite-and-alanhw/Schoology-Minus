<?php
// Schoology Minus compiler.
// Works on PHP >7.4.29.
function starts( $haystack, $needle ) {
    $length = strlen( $needle );
    return substr( $haystack, 0, $length ) === $needle;
}
function striposAll($haystack, $needle) {
    $haystack = strtoupper($haystack);
    $needle   = strtoupper($needle);
    $lastPos = 0;
    $positions = array();

    while (($lastPos = strpos($haystack, $needle, $lastPos))!== false) {
        $positions[] = $lastPos;
        $lastPos = $lastPos + strlen($needle);
    }
    return $positions;
}
?>
Step 0
Wait, there was a step 0? 
=========================
To continue compilation, press ENTER now. To hear some boring stuff, type anything other than ENTER.
<?php 
if (readline('')) {
    echo "OK then, here's the README you asked to see:\n";
    exit(file_get_contents('README.compiler.md'));
}
?>

Step 1
Input file
==========

Using file <?php 
$file = readline('[template.js] (hint: Leave this blank!): ');
if (!$file) { echo 'template.js'; $file = 'template.js'; }
if (!file_exists($file)) {
    exit("\nFile does not exist. Get nubed.\n");
}
?>

Step 2
i18n and l10n
=========================
Available languages here:
<?php 
foreach (scandir('files/') as $lang) {
    if ($lang === '.' || $lang === '..') continue;
    echo " - " . $lang . "\n";
}
?>
Language [en]: <?php $lang = readline('');
if (!$lang) $lang = 'en';
if (!is_dir("files/$lang")) exit('Invalid language. Get nubed.' . "\n");
?>
Normalizing line breaks to Unix (\n)...
<?php 
$template = explode("\n", file_get_contents($file));
foreach ($template as $num => &$line) {
    echo "Process line $num\n";
    $line = trim($line, "\r");
}
$file = implode("\n", $template);
?>Normalizing complete
Replacing variables...
Discovering variables...
<?php
$variables = array_diff(scandir('files/' . $lang), array('.', '..'));
echo count($variables);
echo ' variables found.';
echo "\n";
$width = 20;
?>Replacing variables...
[<?php echo str_repeat(" ", $width); ?>] 0/<?php echo count($variables); ?> (0%)
Replacements started
<?php
$num = 0;
foreach ($variables as $variable) {
    $num++;
    echo '[';
    echo str_repeat("=", round($num / count($variables) * 20));
    echo str_repeat(" ", 20 - round($num / count($variables) * 20));
    echo "] ";
    echo $num;
    echo '/' . count($variables) . ' (';
    echo 100 * round($num / count($variables), 2);
    echo "%)\n";
    echo "Looking for \$$variable\n";
    $var = "$" . $variable;
    echo substr_count(strtoupper($file), strtoupper($var));
    echo " match";
    echo substr_count(strtoupper($file), strtoupper($var)) - 1 ? "es" : "";
    echo "\n";
    $t = explode("\n", $file);
    $replaceme = preg_quote($var, '/');
    foreach ($t as $lineNumber => &$line) {
        if (stripos($line, $var) !== false) {
            echo "On line $lineNumber:\n  ";
            echo $line;
            echo "\n  ";
            $offsets = striposAll($line, $var);
            $offset = $offsets[0];
            foreach ($offsets as $index => $number) {
                echo str_repeat(" ", $offset);
                echo "^";
                if (isset($offsets[$index + 1])) $offset = $offsets[$index + 1] - $number - 1;
            }
            echo "\n";
            $line = preg_replace("/" . $replaceme . "/i", file_get_contents("files/$lang/$variable"), $line);
        }
    }
    $file = implode("\n", $t);
}
fwrite(fopen('schoology-.user.js', 'w+'), $file);
?>

Complete!

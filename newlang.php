Create a new Schoology Minus language 
<?php
$editor = readline('First, good Peter Quince, enter the name of your text editor: ');
$language = readline('And enter the name of your new language: ');
$langs = array_diff(scandir('files/', SCANDIR_SORT_NONE), array('.', '..'));
echo "\nCurrently available languages\n==================\n";
foreach ($langs as $lang) {
    echo " - $lang\n";
}
$existinglanguage = readline('Enter the language you want to translate from from the list above: ');
if (!in_array($existinglanguage, $langs)) die('Invalid language. Get nubed.' . "\n");
?>
Making temporary files...
<?php 
if (is_dir("translate/$language")) {
    if (!readline('Warning: Another translation session with this same language is in progress. Press Enter now to abort the translation, or anything else to overwrite the existing session.')) {
        exit(0);
    }
}
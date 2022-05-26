Create a new Schoology Minus language 
=======================================
<?php
$editor = readline('Enter the command used to start your favorite text editor (e.g. nano, emacs, vim): ');
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
    if (!readline('Warning: Another translation session with this same language is in progress. Press Enter now to abort the translation, or anything else to overwrite the existing session. ')) {
        exit(0);
    }
} else {
    mkdir("translate/$language", 0777);
}
$existingfiles = array_diff(scandir("files/$existinglanguage"), array('.', '..'));
foreach ($existingfiles as $file) {
    echo "Copy file $file\n";
    fwrite(fopen("translate/$language/$file", 'w+'), file_get_contents("files/$existinglanguage/$file"));
}
$i18nfiles = array_diff(scandir("translate/$language"), array('.', '..'));
?>
Translation process 
===================
Next comes the translation. Each file will be 
opened in the text editor you specified above with 
the current contents of the message in it. Your job is 
to translate the message in the file and exit the text 
editor to translate the next file. 

<?php readline('Ready [Ctrl-C = no]? '); 
$num = 0;
$total = count($i18nfiles);
foreach ($i18nfiles as $file) {
    echo "Translating $file\n";
    echo "Opening editor...\n";
    system("$editor translate/$language/$file > `tty`");
    $num++;
    echo "Editor closed. ";
    echo "$num message(s) out of $total translated!";
    echo "\n";
    readline("Ready to continue? (Ctrl-C = quit) ");
}
?>

Translation ALMOST complete!
================================================
Woohoo! You finished translating. Now we'll copy 
your files into a new language directory.

<?php
readline('Enter = continue: ');
$prog = 0;
mkdir("files/$language", 0777);
foreach ($i18nfiles as $file) {
    fwrite(fopen("files/$language/$file", "w+"), file_get_contents("translate/$language/$file"));
    $prog++;
    echo "$prog file(s) written out of $total\n";
}
?>

TRANSLATION COMPLETE!
======================
Oberon: 
I wonder if Titania be awaked.
Then, what it was that next came in her eye,
Which she must dote on in extremity.
Here comes my messenger. How now, mad spirit?
What night-rule now about this haunted grove?
<?php readline('Continue? (This is a rhetorical question) '); ?>


Puck:
My mistress with a monster is in love.
Near to her close and consecrated bower,
While she was in her dull and sleeping hour,
A crew of patches, rude mechanicals
That work for bread upon Athenian stalls,
Were met together to rehearse a play
Intended for great Theseus' nuptial day.
The shallowest thick-skin of that barren sort,
Who Pyramus presented in their sport,
Forsook his scene and entered in a brake,
When I did him at this advantage take,
<?php readline('You have to press ENTER. BWAHAHAHA '); ?>
An ass's nole I fixed on his head.
Anon his Thisbe must be answerèd,
And forth my mimic comes. When they him spy,
As wild geese that the creeping fowler eye,
Or russet-pated choughs, many in sort,
Rising and cawing at the gun's report,
Sever themselves and madly sweep the sky-
So at his sight away his fellows fly;
And, at our stamp, here o'er and o'er one falls.
He "Murder!" cries and help from Athens calls.
<?php readline('You have to press ENTER. BWAHAHAHA '); ?>
Their sense thus weak, lost with their fears thus
strong,
Made senseless things begin to do them wrong.
For briers and thorns at their apparel snatch,
Some sleeves, some hats from yielders all things
catch.
I led them on in this distracted fear
And left sweet Pyramus translated there.
When in that moment so it came to pass,
Titania waked and straightway loved an ass.
<?php 
if (readline('Anyway, translation is complete. Would you like to commit now? (Type empty string to quit, anything else to commit) ')) {
    echo "$ git add files/$language";
    system("git add files/$language > `tty`");
    echo "\n$ git commit -m \"Adding translation of $language. (newlang.php wizard)\"";
    system("git commit -m \"Adding translation of $language. (newlang.php wizard)\" > `tty`");
    echo "\n$ git push";
    system('git push > `tty`');
}
<h4>
<?php
if(isset($_GET['message'])){
    $message = $_GET['message'];
    echo esc_html($message);
} else {
    echo "No message found.";
}
?>
</h4>

<a href="<?php echo home_url(); ?>">Home</a>
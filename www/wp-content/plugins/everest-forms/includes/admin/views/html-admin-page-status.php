<?php
/**
 * Admin View: Page - Status
 *
 * @package EverestForms/Admin/Logs
 */

defined( 'ABSPATH' ) || exit;

$current_tab = ! empty( $_REQUEST['tab'] ) ? sanitize_title( $_REQUEST['tab'] ) : 'logs';
$tabs        = array(
	'logs' => __( 'Logs', 'everest-forms' ),
);
$tabs        = apply_filters( 'everest_forms_admin_status_tabs', $tabs );
?>
<div class="wrap everest-forms">
	<nav class="nav-tab-wrapper evf-nav-tab-wrapper">
		<?php
			foreach ( $tabs as $name => $label ) {
				echo '<a href="' . admin_url( 'admin.php?page=evf-status&tab=' . $name ) . '" class="nav-tab ';
				if ( $current_tab == $name ) {
					echo 'nav-tab-active';
				}
				echo '">' . $label . '</a>';
			}
		?>
	</nav>
	<h1 class="screen-reader-text"><?php echo esc_html( $tabs[ $current_tab ] ); ?></h1>
	<?php
		switch ( $current_tab ) {
			case "logs" :
				EVF_Admin_Status::status_logs();
			break;
			default :
					if ( array_key_exists( $current_tab, $tabs ) && has_action( 'everest_forms_admin_status_content_' . $current_tab ) ) {
						do_action( 'everest_forms_admin_status_content_' . $current_tab );
					} else {
						EVF_Admin_Status::status_logs();
					}
			break;
		}
	?>
</div>

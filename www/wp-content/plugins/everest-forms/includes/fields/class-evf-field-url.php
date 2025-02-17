<?php
/**
 * URL field.
 *
 * @package EverestForms\Fields
 * @since   1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * EVF_Field_URL class.
 */
class EVF_Field_URL extends EVF_Form_Fields {

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->name     = esc_html__( 'Website / URL', 'everest-forms' );
		$this->type     = 'url';
		$this->icon     = 'evf-icon evf-icon-website';
		$this->order    = 10;
		$this->group    = 'advanced';
		$this->settings = array(
			'basic-options' => array(
				'field_options' => array(
					'label',
					'meta',
					'description',
					'required',
				),
			),
			'advanced-options' => array(
				'field_options' => array(
					'placeholder',
					'label_hide',
					'css',
				),
			),
		);

		parent::__construct();
	}

	/**
	 * Field preview inside the builder.
	 *
	 * @since      1.0.0
	 *
	 * @param array $field
	 */
	public function field_preview( $field ) {

		// Define data.
		$placeholder = ! empty( $field['placeholder'] ) ? esc_attr( $field['placeholder'] ) : '';

		// Label.
		$this->field_preview_option( 'label', $field );

		// Primary input.
		echo '<input type="url" placeholder="' . $placeholder . '" class="widefat" disabled>';

		// Description.
		$this->field_preview_option( 'description', $field );
	}

	/**
	 * Field display on the form front-end.
	 *
	 * @since      1.0.0
	 *
	 * @param array $field
	 * @param array $deprecated
	 * @param array $form_data
	 */
	public function field_display( $field, $deprecated, $form_data ) {

 		// Define data.
		$primary = $field['properties']['inputs']['primary'];
		// Primary field.
		printf( '<input type="url" %s %s>',
			evf_html_attributes( $primary['id'], $primary['class'], $primary['data'], $primary['attr'] ),
			$primary['required']
		);
	}
}


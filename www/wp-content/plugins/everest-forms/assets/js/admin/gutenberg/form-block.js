/**
 * Everest Forms Form Block
 *
 * A block for embedding a Everest Forms into a post/page.
 */

'use strict';

/* global evf_form_block_data, wp */
const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;
const { InspectorControls } = wp.editor;
const { SelectControl, ToggleControl, PanelBody, ServerSideRender, Placeholder } = wp.components;

const EverestFormIcon = createElement( 'svg', { width: 24, height: 24, viewBox: '0 0 24 24' },
	createElement( 'path', { fill: 'currentColor', d: 'M18.1 4h-3.8l1.2 2h3.9zM20.6 8h-3.9l1.2 2h3.9zM20.6 18H5.8L12 7.9l2.5 4.1H12l-1.2 2h7.3L12 4.1 2.2 20h19.6z' } )
);

registerBlockType( 'everest-forms/form-selector', {
	title: evf_form_block_data.i18n.title,
	description: evf_form_block_data.i18n.description,
	icon: EverestFormIcon,
	category: 'widgets',
	attributes: {
		formId: {
			type: 'string',
		},
	},
	edit( props ) {
		const { attributes: { formId = '' }, setAttributes } = props;
		const formOptions = evf_form_block_data.forms.map( value => (
			{ value: value.ID, label: value.post_title }
		) );
		let jsx;

		formOptions.unshift( { value: '', label: evf_form_block_data.i18n.form_select } );

		function selectForm( value ) {
			setAttributes( { formId: value } );
		}

		jsx = [
			<InspectorControls key="evf-gutenberg-form-selector-inspector-controls">
				<PanelBody title={ evf_form_block_data.i18n.form_settings }>
					<SelectControl
						label={ evf_form_block_data.i18n.form_selected }
						value={ formId }
						options={ formOptions }
						onChange={ selectForm }
					/>
				</PanelBody>
			</InspectorControls>
		];

		if ( formId ) {
			jsx.push(
				<ServerSideRender
					key="evf-gutenberg-form-selector-server-side-renderer"
					block="everest-forms/form-selector"
					attributes={ props.attributes }
				/>
			);
		} else {
			jsx.push(
				<Placeholder
					key="evf-gutenberg-form-selector-wrap"
					icon={ EverestFormIcon }
					instructions={ evf_form_block_data.i18n.title }
					className="everest-form-gutenberg-form-selector-wrap">
					<SelectControl
						key="evf-gutenberg-form-selector-select-control"
						value={ formId }
						options={ formOptions }
						onChange={ selectForm }
					/>
				</Placeholder>
			);
		}

		return jsx;
	},
	save() {
		return null;
	},
} );

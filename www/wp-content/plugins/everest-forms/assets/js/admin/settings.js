/* global everest_forms_settings_params, jconfirm */
( function( $, params ) {

	// Confirm defaults.
	$( document ).ready( function () {
		// jquery-confirm defaults.
		jconfirm.defaults = {
			closeIcon: true,
			backgroundDismiss: true,
			escapeKey: true,
			animationBounce: 1,
			useBootstrap: false,
			theme: 'modern',
			boxWidth: '400px',
			columnClass: 'evf-responsive-class'
		};
	});

	// Color picker
	$( '.colorpick' )

		.iris({
			change: function( event, ui ) {
				$( this ).parent().find( '.colorpickpreview' ).css({ backgroundColor: ui.color.toString() });
			},
			hide: true,
			border: true
		})

		.on( 'click focus', function( event ) {
			event.stopPropagation();
			$( '.iris-picker' ).hide();
			$( this ).closest( 'td' ).find( '.iris-picker' ).show();
			$( this ).data( 'original-value', $( this ).val() );
		})

		.on( 'change', function() {
			if ( $( this ).is( '.iris-error' ) ) {
				var original_value = $( this ).data( 'original-value' );

				if ( original_value.match( /^\#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/ ) ) {
					$( this ).val( $( this ).data( 'original-value' ) ).change();
				} else {
					$( this ).val( '' ).change();
				}
			}
		});

	$( 'body' ).on( 'click', function() {
		$( '.iris-picker' ).hide();
	});

	// Edit prompt
	$( function() {
		var changed = false;

		$( 'input, textarea, select, checkbox' ).change( function() {
			changed = true;
		});

		$( '.evf-nav-tab-wrapper a' ).click( function() {
			if ( changed ) {
				window.onbeforeunload = function() {
					return params.i18n_nav_warning;
				};
			} else {
				window.onbeforeunload = '';
			}
		});

		$( '.submit :input' ).click( function() {
			window.onbeforeunload = '';
		});
	});

	// Select all/none
	$( '.everest-forms' ).on( 'click', '.select_all', function() {
		$( this ).closest( 'td' ).find( 'select option' ).attr( 'selected', 'selected' );
		$( this ).closest( 'td' ).find( 'select' ).trigger( 'change' );
		return false;
	});

	$( '.everest-forms' ).on( 'click', '.select_none', function() {
		$( this ).closest( 'td' ).find( 'select option' ).removeAttr( 'selected' );
		$( this ).closest( 'td' ).find( 'select' ).trigger( 'change' );
		return false;
	});
})( jQuery, everest_forms_settings_params );

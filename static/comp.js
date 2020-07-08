//Prevent Bootstrap dialog from blocking focusin
$(document).on('focusin', function (e) {
	if ($(e.target).closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root").length) {
		e.stopImmediatePropagation();
	}
});

$(document).ready(function () {
	// buttons to show and hide tinymce

	// Toggle Editor
	$('#btn_toggle').click(function () {
		// Check TinyMCE initialized or not
		if (tinyMCE.get('editor')) {
			tinymce.remove('#contente');
		} else {
			//add TinyMCE
			addTinyMCE();
		}

	});

	$('#btnno_toggle').click(function () {
		// Check TinyMCE initialized or not
		if (tinyMCE.get('editor')) {
			addTinyMCE();
		} else {
			//remove TinyMCE
			tinymce.remove('#contente');
		}

	});
});

////tinyMce setup
function addTinyMCE() {
	// Initialize
	tinymce.init({
		selector: '#contente',
		plugins: 'template image imagetools a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker link',
		toolbar: 'undo redo | formatselect fontselect fontsizeselect div |' +
			'bold italic backcolor forecolor | alignleft aligncenter ' +
			'alignright alignjustify | bullist numlist outdent indent | ' +
			'link code table image template | ',
		block_formats: 'Paragraph=p; Div=div; Header 1=h1; Header 2=h2; Header 3=h3; Header 4=h4; Header 5=h5; Header 6=h6;',
		templates: [
			{
				title: 'Email head',
				description: 'email head',
				url: './snippets/email_header_structure/head.html'
			},
			{
				title: 'Email pre-header',
				description: 'email pre-header',
				url: './snippets/email_header_structure/pre-header.html'
			},
			{
				title: 'Email header',
				description: 'email header',
				url: './snippets/email_header_structure/header.html'
			},
			{
				title: 'Email 0ne Column',
				description: 'email one column',
				url: './snippets/email_header_structure/1col.html'
			},
			{
				title: 'Email Two Columns',
				description: 'email two columns',
				url: './snippets/email_header_structure/2cols.html'
			},
			{
				title: 'Email Three Columns',
				description: 'email three columns',
				url: './snippets/email_header_structure/3cols.html'
			}
		],
		formats: {
			'custom-wrapper': {
				block: 'div',
				classes: 'wrapper',
				wrapper: true
			}
		},
		draggable_modal: true,
		menubar: false,
		toolbar_mode: 'wrap',
		tinycomments_mode: 'embedded',
		tinycomments_author: 'Fernando Fas',


		setup: function (editor) {

			var css = document.getElementById("css");
			var js = document.getElementById("js");
			var code = document.getElementById('code').contentWindow.document;

			editor.on('change', function (e) {

				var newVal = tinymce.get('contente').getContent();

				code.open();
				code.writeln("<style>" + css.value + "</style></head>" + newVal + "<script>" + js.value + "</script></body>");
				code.close();

			});
		}

	});
}

function compile() {

	var htmlcode = document.getElementById("contente");
	var css = document.getElementById("css");
	var js = document.getElementById("js");
	var code = document.getElementById("code").contentWindow.document;

	document.body.onkeyup = function () {
		code.open();
		code.writeln("<style>" + css.value + "</style></head>" + htmlcode.value + "<script>" + js.value + "</script></body>");
		code.close();
	};
};

compile();
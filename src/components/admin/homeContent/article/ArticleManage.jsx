import React from 'react';

// Partials
import FormInputField from '../../../common/formComponents/FormInputField';
import FormTextareaField from '../../../common/formComponents/FormTextareaField';

// Constants
import { BUTTONS_BG } from '../../../../data/constants/componentConstants';



function ArticleManage (props) {

	const {sectionHeading, sectionContent, articleHeading, articleContent} = props.data;

	return (

		<div>
			<FormInputField
				type='text'
				name='sectionHeading'
				label='Заглавие на секция'
				value={sectionHeading}
				required={true}
				disabled={false}
				onChange={props.handleChange}
			/>

			<FormTextareaField
				componentClass='textarea'
				label='Съдържание на секция'
				rows={10}
				name='sectionContent'
				value={sectionContent}
				onChange={props.handleChange}
				required={true}
			/>

			<FormInputField
				type='text'
				name='articleHeading'
				label='Заглавие на статия'
				value={articleHeading}
				required={true}
				disabled={false}
				onChange={props.handleChange}
			/>

			<FormTextareaField
				componentClass='textarea'
				label='Съдържание на статия'
				rows={10}
				name='articleContent'
				value={articleContent}
				onChange={props.handleChange}
				required={true}
			/>


			<div className="text-center buttons-container">
				<button className="btn btn-success" onClick={props.saveChanges}>{BUTTONS_BG.saveChanges}</button>
			</div>

		</div>

	);

}

export default ArticleManage;

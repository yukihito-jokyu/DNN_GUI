import React from 'react';
import '../css/ModelField.css';
import ModelFieldHeader from './ModelFieldHeader';
import ModelTile from './ModelTile';
import ModelCreateButton from './ModelCreateButton';
import DLButton from '../../uiParts/component/DLButton';

function ModelField() {
  return (
    <div className='model-field-wrapper'>
      <ModelFieldHeader />
      <ModelTile />
      <ModelCreateButton />
      <div className='DL-field'>
        <DLButton />
      </div>
    </div>
  )
}

export default ModelField;

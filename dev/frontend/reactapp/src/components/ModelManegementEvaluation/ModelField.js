import React, { useEffect, useState } from 'react';
import './ModelManegementEvaluation.css';
import ModelFieldHeader from './ModelFieldHeader';
import ModelTile from './ModelTile';
import ModelCreateButton from './ModelCreateButton';
import DLButton from './DLButton';
import { useNavigate } from 'react-router-dom';
import { getModelId } from '../../db/firebaseFunction';
import ModelCreateField from './ModelCreateField';

function ModelField() {
  const [models, setModels] = useState([])
  const [DL, setDL] = useState(false);
  const [create, setCreate] = useState(false);
  const porjectId = 'CartPole'
  useEffect(() => {
    const fetchProjects = async () => {
      const userId = JSON.parse(sessionStorage.getItem('userId'));
      const dataList = await getModelId(userId, porjectId);
      const modelsWithCheckbox = dataList.map(model => ({ ...model, isChecked: false }));
      setModels(modelsWithCheckbox);
    };

    fetchProjects();

  }, [porjectId]);

  // 照準降順並び替え
  const accuracySort = (isAscending) => {
    const sortModels = [...models].sort((a, b) => {
      return isAscending ? b.accuracy - a.accuracy : a.accuracy - b.accuracy;
    });
    setModels(sortModels);
  };
  const lossSort = (isAscending) => {
    const sortModels = [...models].sort((a, b) => {
      return isAscending ? b.loss - a.loss : a.loss - b.loss;
    });
    setModels(sortModels);
  };
  const dateSort = (isAscending) => {
    const sortModels = [...models].sort((a, b) => {
      return isAscending ? b.date - a.date : a.date - b.date;
    });
    setModels(sortModels);
  };

  // チェックボックスの更新
  const handleCheckboxChange = (id) => {
    const updateModels = models.map(model =>
      model.id === id ? {...model, isChecked: !model.isChecked} : model
    );
    setModels(updateModels);
  };

  // modelsが更新された後に実行されるコード
  useEffect(() => {
    const isChecked = models.some(model => model.isChecked);
    // チェックされた時に実行する処理
    if (isChecked) {
      setDL(true);
    } else {
      setDL(false);
    }
  }, [models]);

  // モデル作成モーダル表示非表示
  const handleCreateModal = () => {
    setCreate(!create);
  };
  return (
    <div className='model-field-wrapper'>
      <ModelFieldHeader accuracySort={accuracySort} lossSort={lossSort} dateSort={dateSort} />
      <div className='tile-field'>
        {models.length > 0 ? (
          models.map((model) => (
            <div key={model.id}>
              <ModelTile 
                modelName={model.model_name}
                accuracy={model.accuracy}
                loss={model.loss}
                date={model.date}
                isChecked={model.isChecked}
                modelId={model.id}
                checkBoxChange={handleCheckboxChange}
              />
            </div>
          ))
        ) : (<></>)}
        <ModelCreateButton handleCreateModal={handleCreateModal} />
      </div>
      {DL ? (
        <div className='DL-field'>
          <DLButton />
        </div>
      ) : (
        <></>
      )
      }
      {create ? (
        <div className='create-background-field'>
          <ModelCreateField handleCreateModal={handleCreateModal} />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}

export default ModelField;

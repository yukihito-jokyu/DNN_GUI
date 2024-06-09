import React, { useEffect, useState } from 'react';
import './Community.css';
import { getProjectInfo } from '../../db/firebaseFunction';
import GradationButton from '../../uiParts/component/GradationButton';
import CIFA10Image from '../../assets/images/CIFA10Image.png';

function ProjectActivate() {
  const [projects, setProjects] = useState(null);
  const projectName = 'CIFAR-10';
  useEffect(() => {
    const fatchProjects = async () => {
      const projectsInfo = await getProjectInfo();
      setProjects(projectsInfo);
    };

    fatchProjects();

  }, []);

  const style1 = {
    width: '200px',
    background: 'linear-gradient(95.34deg, #B6F862 3.35%, #00957A 100%), linear-gradient(94.22deg, #D997FF 0.86%, #50BCFF 105.96%)'
  };
  return (
    <div className='project-activate-wrapper'>
      <div className='activate-left'>
        {projects ? (
          <div className='activate-info-field'>
            <p className='activate-project-title'>{projectName}</p>
            <p dangerouslySetInnerHTML={{ __html: projects[projectName] }} className='activate-project-info'></p>
          </div>
        ) : (<></>)}
        <div className='activate-button-wrapper'>
          <GradationButton text={'Activate'} style1={style1} />
        </div>
      </div>
      <div className='activate-right'>
        <img src={CIFA10Image} alt='ProjectImage' className='activate-project-image' />
      </div>
    </div>
  );
};

export default ProjectActivate;
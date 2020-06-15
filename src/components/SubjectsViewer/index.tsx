import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Container, Search, Headers, Content, Subject } from './styles';

interface SubjectItem {
  id: string;
  name: string;
}

interface SubjectsViewerProps {
  initialData?: Array<string>;
}
const SubjectsViewer: React.FC<SubjectsViewerProps> = ({ initialData }) => {
  const [subjects, setSubjects] = useState<SubjectItem[]>([]);

  useEffect(() => {
    api.get('/subjects').then(response => {
      if (response.status === 200) {
        setSubjects(response.data);
      }
    });
  }, []);
  return (
    <Container>
      <Search />
      <Headers>
        <div id="select">
          <span>S</span>
        </div>
        <div id="name">
          <span>Name</span>
        </div>
        <div id="rep">
          <span>Repetition</span>
        </div>
        <div id="stat">
          <span>Status</span>
        </div>
        <div id="edit">
          <span>Last Edit</span>
        </div>
      </Headers>
      {subjects.map(sub => (
        <Subject>
          <div id="select">
            <span>{sub.name}</span>
          </div>
          <div id="name">
            <span>{sub.name}</span>
          </div>
          <div id="rep">
            <span>{sub.name}</span>
          </div>
          <div id="stat">
            <span>{sub.name}</span>
          </div>
          <div id="edit">
            <span>{sub.name}</span>
          </div>
        </Subject>
      ))}
    </Container>
  );
};

export default SubjectsViewer;

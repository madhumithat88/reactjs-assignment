import List from './../components/List';
import Empty from './../components/Empty';
import Loader from '../components/Loader';
import ParticipantService from '../services/ParticipantService';
import { useState, useEffect } from 'react';

const Participants = ({}) => {

  const [participants, setParticipants] = useState([]);
  const [load, setLoad] = useState();

  const loader = state => {
    setLoad(state);
  };

  useEffect(() => {
    const getAllParticipants = async () => {
      try {
        loader(true);

        const data = await ParticipantService.getAll();
        const participantsAll = data.reverse();

        setParticipants(participantsAll)
      } catch (error) {
        window.alert(`Error Occurred: ${error.message}`);
      } finally {
        loader(false);
      }
    };

    getAllParticipants();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col">
          <List participants={participants} />
          <Empty notes={[]} />
          {load && <Loader />}
        </div>
      </div>
    </>
  );
};

export default Participants;

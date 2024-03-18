import { useState } from 'react';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import MyGroups from '@/components/Groups/MyGroups';
import AllGroups from '@/components/Groups/AllGroups';
import CreateNewGroup from '@/components/Groups/CreateNewGroup';
import QuizManagement from '@/components/EducatorDashboard/QuizManagement';
import QuizCreate from '@/components/Quizzes/QuizzCreate';

const EducatorDashboard = () => {
  const [showCreateQuizForm, setShowCreateQuizForm] = useState(false);
  const [showQuizManagement, setShowQuizManagement] = useState(false);
  const [showMyGroups, setShowMyGroups] = useState(false);
  const [showAllGroups, setShowAllGroups] = useState(false);
  const [showCreateNewGroup, setShowCreateNewGroup] = useState(false);

  const handleCreateQuizClick = () => {
    setShowCreateQuizForm(true);
    setShowQuizManagement(false);
    setShowMyGroups(false);
    setShowAllGroups(false);
    setShowCreateNewGroup(false);
  };

  const handleQuizManagementClick = () => {
    setShowCreateQuizForm(false);
    setShowQuizManagement(true);
    setShowMyGroups(false);
    setShowAllGroups(false);
    setShowCreateNewGroup(false);
  };

  const handleMyGroupsClick = () => {
    setShowCreateQuizForm(false);
    setShowQuizManagement(false);
    setShowMyGroups(true);
    setShowAllGroups(false);
    setShowCreateNewGroup(false);
  };

  const handleAllGroupsClick = () => {
    setShowCreateQuizForm(false);
    setShowQuizManagement(false);
    setShowMyGroups(false);
    setShowAllGroups(true);
    setShowCreateNewGroup(false);
  };

  const handleCreateNewGroupClick = () => {
    setShowCreateQuizForm(false);
    setShowQuizManagement(false);
    setShowMyGroups(false);
    setShowAllGroups(false);
    setShowCreateNewGroup(true);
  };

  return (
    <div className="flex h-screen">
      {/* Left menu */}
      <div className="w-1/4  flex flex-col justify-start p-4">
        <Accordion >
          <AccordionItem title="Quizzes">
            <Button ghost onClick={handleCreateQuizClick} block>
              Create New Quiz
            </Button>
            <Button ghost onClick={handleQuizManagementClick} block>
              Quiz Management
            </Button>
          </AccordionItem>
          <AccordionItem title="Groups">
            <Button ghost onClick={handleMyGroupsClick} block>
              My Groups
            </Button>
            <Button ghost onClick={handleAllGroupsClick} block>
              All Groups
            </Button>
            <Button ghost onClick={handleCreateNewGroupClick} block>
              Create New Group
            </Button>
          </AccordionItem>
          {/* Add more accordion items as needed */}
        </Accordion>
      </div>

      {/* Right content area */}
      <div className="w-3/4 p-4">
        {/* Render different content based on selected menu */}
        {showCreateQuizForm && <QuizCreate />}
        {showQuizManagement && <QuizManagement />}
        {showMyGroups && <MyGroups />}
        {showAllGroups && <AllGroups />}
        {showCreateNewGroup && <CreateNewGroup />}
        {/* Default content */}
        {/* Render default content */}
      </div>
    </div>
  );
};

export default EducatorDashboard;
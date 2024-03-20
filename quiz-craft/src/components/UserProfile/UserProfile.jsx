import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserData } from '/services/users.service';
import {
  Avatar,
  Button,
  Card,
  Chip,
} from '@nextui-org/react';
import { uploadAvatar } from '/services/images.service';
import PropTypes from 'prop-types';
import { editUser } from '/services/users.service';
import { useToast } from '../ui/use-toast';
import { User, Mail, Phone, UserSearch, Image, Trash } from 'lucide-react';
import { Toaster } from '../ui/toaster';
import { motion } from 'framer-motion';
// import { deleteAvatar } from '/services/images.service';

export default function UserProfile({ currentUser, updateUserData }) {
  const id = useParams().id;
  const [userData, setUserData] = useState(null);
  const [avatarUpload, setAvatarUpload] = useState(null);
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [showEditAvatar, setShowEditAvatar] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const snapshot = await getUserData(id);
      if (!snapshot.exists()) {
        throw new Error('User data not found!');
      }
      setUserData(snapshot.val()[Object.keys(snapshot.val())[0]]);
    };
    fetchUserData();
  }, [id]);

  const handleAvatarUpload = async () => {
    try {
      setIsUploading(true);
      const uploadedAvatarURL = await uploadAvatar(avatarUpload);

      setAvatarUpload(null);
      const fileInput = document.querySelector('input[type="file"]');
      fileInput.value = '';

      const newUserData = { ...userData, photo: uploadedAvatarURL };
      await editUser(newUserData);
      setUserData(newUserData);
      updateUserData(newUserData);

      toast({
        title: 'Avatar uploaded successfully',
        description: 'Your avatar has been uploaded successfully.',
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAvatarRemove = async () => {
    try {
      // this is how you would delete the avatar from the storage
      // but we need to find a way to pass the image's name and not the whole URL
      // await deleteAvatar(userData?.photo);

      const newUserData = { ...userData, photo: '' };
      await editUser(newUserData);
      setUserData(newUserData);
      updateUserData(newUserData);

      toast({
        title: 'Avatar removed successfully',
        description: 'Your avatar has been removed successfully.',
      });
    } catch (error) {
      console.error('Error removing avatar:', error);
    } finally {
      setShowEditAvatar(false);
    }
  };

  return (
    <>
      <Toaster />
      <Card radius='none' className="mt-36 p-3 bg-gradient-to-t from-slate-600 to-slate-900 text-white">
        {userData?.username.endsWith('s') ? (
          <h1 className="text-center text-3xl mb-10 font-bold">
            {userData?.username}&apos; profile
          </h1>
        ) : (
          <h1 className="text-center text-3xl mb-10 font-bold">
            {userData?.username}&apos;s profile
          </h1>
        )}
        <div className="flex justify-center items-center">
          <motion.div
            whileHover={
              currentUser?.uid === userData?.uid ? { opacity: 0.6 } : {}
            }
          >
            <Avatar
              className={
                currentUser?.uid === userData?.uid
                  ? 'cursor-pointer w-20 h-20 mr-7 text-large'
                  : 'w-20 h-20 mr-7 text-large'
              }
              name={userData?.username.slice(0, 1)}
              src={userData?.photo}
              onClick={() => {
                if (currentUser?.uid === userData?.uid) {
                  setShowEditAvatar(!showEditAvatar);
                  setAvatarUpload(null);
                }
              }}
            />
          </motion.div>

          {currentUser?.uid === userData?.uid && showEditAvatar === true && (
            <Card className="p-4 mr-7 bg-slate-900 flex flex-row items-center text-white">
              <input
                type="file"
                onChange={(e) => {
                  setAvatarUpload(e.target.files[0]);
                }}
                className='w-60'
              />
              {avatarUpload !== null && (
                <Button
                  isLoading={isUploading}
                  variant="ghost"
                  startContent={<Image />}
                  onClick={handleAvatarUpload}
                >
                  Upload Avatar
                </Button>
              )}
              {userData?.photo && avatarUpload === null && (
                <Button
                  color="danger"
                  variant="ghost"
                  onClick={handleAvatarRemove}
                  startContent={<Trash />}
                >
                  Remove Avatar
                </Button>
              )}
            </Card>
          )}

          <div className="border-l-3 pl-7">
            <div className="flex items-center border-b-3 pb-2">
              <UserSearch />
              <p className="ml-2">{userData?.username}</p>
              <Chip className="ml-2">{userData?.role}</Chip>
            </div>

            <div className="flex items-center border-b-3 py-2">
              <Mail />
              <p className="ml-2">{userData?.email}</p>
            </div>

            <div className="flex items-center border-b-3 py-2">
              <User />
              <p className="ml-2">
                {userData?.firstName} {userData?.lastName}
              </p>
            </div>

            <div className="flex items-center pt-2">
              <Phone />
              <p className="ml-2">{userData?.phone}</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}

UserProfile.propTypes = {
  currentUser: PropTypes.object,
  updateUserData: PropTypes.func,
};

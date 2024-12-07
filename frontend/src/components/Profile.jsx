import React, { Fragment, useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const profilePhoto = user?.profile?.profilePhoto || `https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg`;

    return (
        <div>
            <div className='border-gray-200 bg-white mx-auto my-5 p-8 border rounded-2xl max-w-4xl'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="w-24 h-24">
                            <AvatarImage src={`${profilePhoto}`} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                {user?.role === 'jobseeker' &&
                    <Fragment>
                        <div className='my-5'>
                            <h1>Skills</h1>
                            <div className='flex items-center gap-1'>
                                {
                                    user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
                                }
                            </div>
                        </div>
                        <div className='items-center gap-1.5 grid w-full max-w-sm'>
                            <Label className="font-bold text-md">Resume</Label>
                            {
                                isResume ? <a target='blank' href={user?.profile?.resume} className='w-full text-blue-500 hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                            }
                        </div>
                    </Fragment>}
            </div>
            {
                user?.role === 'jobseeker' &&
                <div className='bg-white mx-auto rounded-2xl max-w-4xl'>
                    <h1 className='my-5 font-bold text-lg'>Applied Jobs</h1>
                    {/* Applied Job Table   */}
                    <AppliedJobTable />
                </div>
            }
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile
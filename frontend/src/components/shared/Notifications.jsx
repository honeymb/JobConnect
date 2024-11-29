import { BellIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies } from '@/hooks/useGetAllCompanies';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { getAllJobsPostedToday, getUserById, updateCompaniesViewedByUser, updateJobsViewedByUser } from '@/lib/utils';
import { setUser } from '@/redux/authSlice';
import { useNavigate } from 'react-router-dom';
import useGetUserLocation from '@/hooks/useGetUserLocation';

const Notifications = ({ companyList = [] }) => {

    const { user } = useSelector((store) => store.auth);
    const { ROUTE_PATH } = useGetUserLocation();
    const [notificationList, setNotificationList] = useState(companyList);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const openNotifs = async () => {
        try {
            if (user?.role === 'admin') {
                setLoading(true);
                const userData = await getUserById(user._id);
                dispatch(setUser(userData));
                const companyList = await fetchCompanies();
                const { companiesViewed = [] } = userData;
                setNotificationList(companyList.filter((notification) => {
                    const pendingStatus = (notification?.userData?.approvalStatus === 'pending');
                    if (companiesViewed && companiesViewed.length) {
                        const companyIndex = companiesViewed.findIndex(
                            (companyId) => notification?.userData?.company === companyId
                        )
                        if (companyIndex < 0 && pendingStatus) {
                            return true;
                        }
                    } else if (companiesViewed && !companiesViewed.length && pendingStatus) {
                        return true;
                    }
                    return false;
                }));
                setLoading(false);
            } else if (user?.role === 'jobseeker') {
                setLoading(true);
                const userData = await getUserById(user._id);
                const jobData = await getAllJobsPostedToday();
                const { jobsViewed = [] } = userData;
                setNotificationList(jobData.filter((notification) => {
                    if (jobsViewed && jobsViewed.length) {
                        const companyIndex = jobsViewed.findIndex((jobId) => notification?._id === jobId)
                        if (companyIndex < 0) { return true; }
                    } else if (jobsViewed && !jobsViewed.length) {
                        return true;
                    }
                    return false;
                }));
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error(error)
        }
    }

    const viewNotification = async (notification = null) => {
        if (notification) {
            if (user?.role === 'admin') {
                await updateCompaniesViewedByUser({ companyId: notification._id });
                navigate(`${ROUTE_PATH}/companies`);
                dispatch(setSearchCompanyByText(notification?.name || ''));
            } else if (user?.role === 'jobseeker') {
                await updateJobsViewedByUser({ jobId: notification._id });
                navigate(`/description/${notification?._id}`);
            }
        }
    }

    const getNotificationName = (name = '') => {
        if (user?.role === 'admin') {
            return `${name} - pending approval`;
        } else if (user?.role === 'jobseeker') {
            return `${name}`;
        }
        return name;
    }

    const getNotificationType = (
        user?.role === 'admin' ? 'Pending Approvals' : 'Latest Jobs Posted'
    )

    return (
        <Popover>
            <PopoverTrigger asChild className="hover:cursor-pointer">
                <BellIcon onClick={openNotifs} height={20} width={20} />
            </PopoverTrigger>
            <PopoverContent className="relative top-3 right-16 w-80">
                {loading && <div>Loading...</div>}
                {
                    !loading &&
                    notificationList.length > 0 &&
                    <div className='flex flex-col gap-2'>
                        <h2 className='flex justify-center items-center font-normal'>{getNotificationType}</h2>
                        {notificationList.map(notification => (
                            <div
                                key={notification._id}
                                className='font-light text-[rgb(194_65_12)] italic cursor-pointer 65'
                                onClick={() => viewNotification(notification)}
                            >
                                {getNotificationName(notification.name || notification.title)}
                            </div>
                        ))}
                    </div>
                }
                {
                    !loading &&
                    notificationList.length === 0 &&
                    <div>You have no Notifications to view!</div>
                }
            </PopoverContent>
        </Popover>
    )
}

export default Notifications

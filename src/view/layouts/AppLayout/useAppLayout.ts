import { useNavigate } from 'react-router-dom';
import { companyServices } from '@/app/services/companyServices';
import { useQuery } from '@tanstack/react-query';
import { profileServices } from '@/app/services/profileServices';
import { useCallback, useEffect, useState } from 'react';

export function useAppLayout() {

  const { getCompanies } = companyServices;
  const { getUserInfo } = profileServices;
  const navigate = useNavigate();
  
  const { data: companies, isLoading: isLoadingCompanies } = useQuery({
    queryKey: ['getCompanies'],
    queryFn: getCompanies,
  });

 const [modalShouldOpen, setModalShouldOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModalShouldOpen(!isLoadingCompanies && companies?.length === 0);
  }, [companies, isLoadingCompanies]);

  const navigateToPage = (address: string) => {
    navigate(address);
  }

  const handleModalShouldOpen = useCallback(
    (state: boolean) => setModalShouldOpen(state), 
  [setModalShouldOpen])

  const { data: userData, isLoading: isLoadingUserInfo } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo,
  });

  const isLoading = isLoadingCompanies && isLoadingUserInfo;

  return {
    modalShouldOpen,
    navigateToPage,
    handleModalShouldOpen,
    userData,
    companies,
    isLoading,
  }

}

import React, { useState, useCallback, useEffect } from 'react';
import styles from './index.module.scss';
import { Box, Flex, Image } from '@chakra-ui/react';
import { PageTypeEnum } from '@/constants/user';
import { useGlobalStore } from '@/store/global';
import type { ResLogin } from '@/api/response/user';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/user';
import { useChatStore } from '@/store/chat';
import LoginForm from './components/LoginForm';
import dynamic from 'next/dynamic';
const RegisterForm = dynamic(() => import('./components/RegisterForm'));
const ForgetPasswordForm = dynamic(() => import('./components/ForgetPasswordForm'));

const Login = () => {
  const router = useRouter();
  const { lastRoute = '' } = router.query as { lastRoute: string };
  const { isPc } = useGlobalStore();
  const [pageType, setPageType] = useState<`${PageTypeEnum}`>(PageTypeEnum.login);
  const { setUserInfo, setLastModelId, loadMyModels, loadKbList, setLastKbId } = useUserStore();
  const { setLastChatId, setLastChatModelId, loadHistory } = useChatStore();

  const loginSuccess = useCallback(
    (res: ResLogin) => {
      // init store
      setLastChatId('');
      setLastModelId('');
      setLastChatModelId('');
      setLastKbId('');
      loadMyModels(true);
      loadKbList(true);
      loadHistory({ pageNum: 1, init: true });

      setUserInfo(res.user);
      setTimeout(() => {
        router.push(lastRoute ? decodeURIComponent(lastRoute) : '/model');
      }, 100);
    },
    [
      lastRoute,
      loadHistory,
      loadKbList,
      loadMyModels,
      router,
      setLastChatId,
      setLastChatModelId,
      setLastKbId,
      setLastModelId,
      setUserInfo
    ]
  );

  function DynamicComponent({ type }: { type: `${PageTypeEnum}` }) {
    const TypeMap = {
      [PageTypeEnum.login]: LoginForm,
      [PageTypeEnum.register]: RegisterForm,
      [PageTypeEnum.forgetPassword]: ForgetPasswordForm
    };

    const Component = TypeMap[type];

    return <Component setPageType={setPageType} loginSuccess={loginSuccess} />;
  }

  useEffect(() => {
    router.prefetch('/model');
  }, [router]);

  return (
    <Flex
      alignItems="center"
      justifyContent={isPc ? 'flex-end' : 'center'}
      className={styles.loginPage}
      px={[0, '15vw']}
      height={isPc ? '100vh' : '100%'}
    >
      <Box
        flex={`0 0 ${isPc ? '350px' : '100%'}`}
        height={isPc ? '680px' : '100%'}
        border="1px"
        borderColor="gray.200"
        backgroundColor="#fff"
        py={isPc ? 35 : 0}
        px={[8, 8]}
        borderRadius={isPc ? 'md' : 'none'}
        marginLeft={[8, 0]}
        marginRight={[8, 0]}
        marginTop={[10, 10]}
        marginBottom={[10, -5]}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          <Image src="/icon/loginLeft.svg" width="65px" height="auto" alt="" />
        </div>


        <DynamicComponent type={pageType} />
      </Box>
    </Flex>









  );
};

export default Login;
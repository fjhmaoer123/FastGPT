import React, { useEffect, useState } from 'react';
import { Card, Box, Link, Flex, Image, Button } from '@chakra-ui/react';
import Markdown from '@/components/Markdown';
import { useMarkdown } from '@/hooks/useMarkdown';
import { useRouter } from 'next/router';
import { useGlobalStore } from '@/store/global';

import styles from './index.module.scss';
import axios from 'axios';
import MyIcon from '@/components/Icon';

const Home = () => {
  const router = useRouter();
  const { inviterId } = router.query as { inviterId: string };
  const { data } = useMarkdown({ url: '/intro.md' });
  const {
    isPc,
    initData: { beianText }
  } = useGlobalStore();
  const [star, setStar] = useState(1500);

  useEffect(() => {
    if (inviterId) {
      localStorage.setItem('inviterId', inviterId);
    }
  }, [inviterId]);

  /* 加载动画 */
  useEffect(() => {
    setTimeout(() => {
      try {
        window.particlesJS?.('particles-js', {
          particles: {
            number: {
              value: 100, // 粒子数量
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#ffd88f" // 粒子颜色
            },
            shape: {
              type: "circle", // 粒子形状
              stroke: {
                width: 0,
                color: "#E8CA90"
              },
              polygon: {
                nb_sides: 5
              }
            },
            opacity: {
              value: 0.5, // 粒子透明度
              random: true, // 随机透明度
              anim: {
                enable: true, // 开启动画
                speed: 1, // 动画速度
                opacity_min: 0.1, // 最小透明度
                sync: false
              }
            },
            size: {
              value: 3, // 粒子大小
              random: true, // 随机大小
              anim: {
                enable: false,
                speed: 10,
                size_min: 0.1,
                sync: false
              }
            },
            line_linked: {
              enable: true,
              distance: 80,
              color: '#f5e6cc',
              opacity: 0.8,
              width: 0.6
            },

            move: {
              enable: true, // 开启移动
              speed: 0.9, // 移动速度
              direction: "none", // 移动方向
              random: true, // 随机移动
              straight: false,
              out_mode: "out",
              bounce: false,
              attract: {
                enable: true,
                rotateX: 800,
                rotateY: 1500
              }
            }
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: {
                enable: true, // 开启悬停事件
                mode: "bubble" // 悬停模式为气泡
              },
              onclick: {
                enable: true, // 开启点击事件
                mode: "push" // 点击模式为排斥
              },
              resize: true
            },
            modes: {
              grab: {
                distance: 200,
                line_linked: {
                  opacity: 0.6
                }
              },
              bubble: {
                distance: 150, // 气泡距离
                size: 6, // 气泡大小
                duration: 2,
                opacity: 0.6,
                speed: 3
              },
              repulse: {
                distance: 80, // 排斥距离
                duration: 0.4
              },
              push: {
                particles_nb: 4
              },
              remove: {
                particles_nb: 3
              }
            }
          },
          retina_detect: true
        });

      } catch (error) { }
    }, 500);
  }, [isPc]);

  useEffect(() => {
    (async () => {
      const { data: git } = await axios.get('https://api.github.com/repos/fjhmaoer123/FastGPT');
      setStar(git.stargazers_count);
    })();
  }, []);

  return (
    <Flex
      className={styles.home}
      position={'relative'}
      flexDirection={'column'}
      alignItems={'center'}
      h={'100%'}
      overflow={'overlay'}
    >
      <Box id={'particles-js'} position={'absolute'} top={0} left={0} right={0} bottom={0} />

      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        mt={'22vh'}
        position={'absolute'}
        userSelect={'none'}
      >
        <Image src="/icon/logo2.png" w={['90px', '140px']} h={['90px', '140px']} alt={''}></Image>
        <Box
          className={styles.textlg}
          fontWeight={'bold'}
          fontSize={['50px', '80px']}
          letterSpacing={'5px'}
        >
          MoYanGPT
        </Box>
        <Box className={styles.textlg} fontWeight={'bold'} fontSize={['30px', '50px']}>

          摩延文化檢索平台

        </Box>


        <Flex flexDirection={['column', 'row']} my={9}>
          <Button
            mr={[0, 6]}
            mb={[6, 0]}
            fontSize={['3xl', '3xl']}
            h={'auto'}
            py={[1, 4]}
            variant={'base'}
            border={'3px solid'}
            borderColor={'#E8CA90'}
            transition={'0.3s'}
            _hover={{
              bg: '#E8CA90',
              color: 'white'
            }}
            leftIcon={<MyIcon name={'git'} w={'30px'} />}
            onClick={() => window.open('https://moyancm.com', '_blank')}
            color={'white'} /* 添加这一行 */
          >
            Moyancm官網

          </Button>
          <Button
            fontSize={['2xl', '4xl']}
            h={'auto'}
            py={[2, 3]}
            variant={'solid'}
            border={'3px solid'}
            borderColor={'#ffd88f'}
            style={{ background: 'linear-gradient(to bottom right, #E8CA90 0%, #ffd88f 40%, #E8CA90 80%,#E8CA90  100%)' }}
            transition={'0.3s'}
            _hover={{
              bg: '#ffd88f',
              color: 'white'
            }}
            onClick={() => router.push(`/model`)}
            color={'black'} /* 添加这一行 */
          >

            Get Started!

          </Button >

        </Flex >

      </Flex >

      <Box w={'100%'} mt={'100vh'} px={[5, 10]} pb={[5, 10]}>


        <Card p={2} mt={4} textAlign={'center'} bg={'transparent'}>
          <Box color={'white'}>Made by MoYanCM Team.</Box>
        </Card>


      </Box>
    </Flex >
  );
};

export default Home;

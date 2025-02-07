import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex } from '@chakra-ui/react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 13H10V4H4V13ZM4 20H10V15H4V20ZM12 20H18V11H12V20ZM12 4V9H18V4H12Z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 'tracking',
      label: 'Tracking Order',
      path: '/tracking_orders',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 'risk',
      label: 'Risk Alert',
      path: '/risk_alerts',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L1 21H23L12 2ZM11 18H13V20H11V18ZM11 10H13V16H11V10Z" fill={activeMenu === 'risk' ? '#4299E1' : 'currentColor'}/>
        </svg>
      ),
    },
    {
      id: 'trucks',
      label: 'Trucks',
      path: '/trucks', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 8H17V4H3C1.9 4 1 4.9 1 6V17H3C3 18.66 4.34 20 6 20C7.66 20 9 18.66 9 17H15C15 18.66 16.34 20 18 20C19.66 20 21 18.66 21 17H23V12L20 8Z" fill={activeMenu === 'trucks' ? '#4299E1' : 'currentColor'}/>
        </svg>
      ),
    },
    {
      id: 'package',
      label: 'Package',
      path: '/package',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 'contract',
      label: 'Contract',
      path: '/contract',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor"/>
        </svg>
      ),
    },
  ];

  const handleMenuClick = (menuId: string, path: string) => {
    setActiveMenu(menuId);
    router.push(path);
  };

  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <Flex
        w="64"
        bg="white"
        boxShadow="lg"
        direction="column"
      >
        {/* Logo */}
        <Flex h="16" align="center" justify="center" borderBottom="1px" borderColor="gray.200">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            style={{ objectFit: 'contain' }}
          />
        </Flex>

        {/* Menu Items */}
        <Flex direction="column" mt="6">
          {menuItems.map((item) => (
            <Flex
              key={item.id}
              align="center"
              px="6"
              py="3"
              cursor="pointer"
              transition="all 0.2s"
              color={activeMenu === item.id ? 'purple.600' : 'gray.600'}
              bg={activeMenu === item.id ? 'purple.50' : 'transparent'}
              _hover={{ bg: activeMenu === item.id ? 'purple.50' : 'gray.50' }}
              onClick={() => handleMenuClick(item.id, item.path)}
            >
              <Flex w="6" h="6">
                {item.icon}
              </Flex>
              <Flex ml="3" fontWeight="medium">
                {item.label}
              </Flex>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* Main Content */}
      <Flex flex="1" p="8" bg="gray.50">
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;

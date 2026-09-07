import { Trans } from '@lingui/macro'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { Box } from 'nft/components/Box'
import { ReactNode, useReducer, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import * as styles from './MenuDropdown.css'
import { NavDropdown } from './NavDropdown'

const DropdownItem = ({ to, children, isActive, onClick }: { to: string; children: ReactNode; isActive: boolean; onClick: () => void }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        color: isActive ? '#2C87BF' : '#9D9D9D',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: isActive ? '600' : '400',
        borderRadius: '8px',
        margin: '2px 8px',
        transition: 'all 0.2s',
        background: isActive ? 'rgba(44, 135, 191, 0.1)' : 'transparent',
      }}
    >
      <span>{children}</span>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </NavLink>
  )
}

export const MoreDropdown = () => {
  const [isOpen, toggleOpen] = useReducer((s) => !s, false)
  const [activeItem, setActiveItem] = useState<string>('')
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, isOpen ? toggleOpen : undefined)

  return (
    <Box position="relative" ref={ref}>
      <Box
        as="button"
        onClick={toggleOpen}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 12px',
          borderRadius: '12px',
          color: '#9D9D9D',
          fontSize: '16px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}
        data-testid="more-nav-link"
      >
        <Trans>More</Trans>
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
          }}
        >
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Box>

      {isOpen && (
        <NavDropdown
          top="48"
          right="0"
          style={{ minWidth: '200px' }}
        >
          <Box display="flex" flexDirection="column" paddingY="8">
            <DropdownItem
              to="/bridge"
              isActive={activeItem === '/bridge'}
              onClick={() => setActiveItem('/bridge')}
            >
              Bridge
            </DropdownItem>
            <DropdownItem
              to="/staking"
              isActive={activeItem === '/staking'}
              onClick={() => setActiveItem('/staking')}
            >
              Staking
            </DropdownItem>
            <DropdownItem
              to="/dft-farming"
              isActive={activeItem === '/dft-farming'}
              onClick={() => setActiveItem('/dft-farming')}
            >
              DFT Farming
            </DropdownItem>
            <DropdownItem
              to="/wallet"
              isActive={activeItem === '/wallet'}
              onClick={() => setActiveItem('/wallet')}
            >
              Wallet
            </DropdownItem>
            <DropdownItem
              to="/dps-vault"
              isActive={activeItem === '/dps-vault'}
              onClick={() => setActiveItem('/dps-vault')}
            >
              DPS Vault
            </DropdownItem>
          </Box>
        </NavDropdown>
      )}
    </Box>
  )
}

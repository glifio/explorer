import { FormEvent, useCallback, useState } from 'react'
import { CID } from 'multiformats/cid'
import {
  Box,
  Label,
  IconSearch,
  InputLabelBase,
  Button,
  Input
} from '@glif/react-components'
import { validateAddressString } from '@glif/filecoin-address'
import { useRouter } from 'next/router'

import { navigate } from '../utils/urlParams'
import { PAGE } from '../../constants'

export default function SearchBar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchError, setSearchError] = useState('')

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      setSearchError('')

      const search = searchTerm.trim()

      if (validateAddressString(search)) {
        navigate(router, {
          pageUrl: PAGE.ACTOR,
          newQueryParams: { address: search }
        })
      } else {
        try {
          CID.parse(searchTerm)
          navigate(router, {
            pageUrl: PAGE.MESSAGE,
            newQueryParams: {
              cid: search
            }
          })
        } catch {
          setSearchError('Invalid search')
        }
      }
    },
    [setSearchError, router, searchTerm]
  )

  return (
    <div>
      <form onSubmit={onSubmit}>
        <Box
          display='flex'
          alignItems='center'
          position='relative'
          overflow='hidden'
          boxShadow={2}
          borderRadius={2}
        >
          <InputLabelBase display='none' htmlFor='check-fil-address' />
          <Input.Base
            id='check-fil-address'
            pr={8}
            pl={4}
            height={7}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {!searchTerm && <IconSearch position='absolute' left={4} />}
          <Button
            position='absolute'
            right={2}
            px={4}
            bg='transparent'
            type='submit'
            title='Search'
            variant='secondary'
            disabled={!searchTerm}
          />
        </Box>
      </form>
      {searchError && (
        <Label color='status.fail.background' ml={2} mt={4}>
          {searchError}
        </Label>
      )}
    </div>
  )
}

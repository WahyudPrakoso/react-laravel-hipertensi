import React, { useEffect, useState } from 'react'
import ResponsivePagination from 'react-responsive-pagination'
import ShowMoreText from "react-show-more-text";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilStorage, cilZoom, cilReload, cilPlus } from '@coreui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { useGejalaPages } from '../../../hooks/queries'
import { useDeleteGejala } from '../../../hooks/mutation'

const Gejala = () => {
    const [page, setPage] = useState(1);
    const navigate = useNavigate()
    const { isPending, isError, data: theDatas, error, isFetching } = useGejalaPages(page)
    
    const deleteMutation = useDeleteGejala()

    if (isError) return `Error: ${error.message}`

    const handleDelete = (id) => {
      deleteMutation.mutate(id)
      setPage(1)
      navigate('/gejala')
    }
    const handleEdit = (id) => navigate(`/gejala/edit/${id}`)
    const handleAdd = () => navigate(`/gejala/add`)
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div style={{display:'flex'}} className='mt-2'>
              <h3>Daftar Gejala</h3>
              <div style={{marginLeft:'auto'}}>
                
                <CButton className='bg-success text-dark' onClick={handleAdd}>
                  Tambah Data <CIcon icon={cilPlus} size='lg'></CIcon>
                </CButton>
              </div>
            </div>
          </CCardHeader>
          <CCardBody>
            
            {isPending? ( <span>Loading ...</span>
            ) : isError ? (
              <div>Error: {error.message}</div>
            ) : (
              
            <>
              <CTable color="" hover align='middle' responsive caption="top">
                {/* <CTableCaption>Daftar data materi</CTableCaption> */}
                
                <CTableHead color=''>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Kode</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Nama</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Kategori</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Deskripsi</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Aksi</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                    {theDatas.data.data?.map((data, index)=>(
                        <CTableRow key={data.id}>
                            <CTableHeaderCell scope="row">{(index+1)+((page-1)*5)}</CTableHeaderCell>
                            <CTableDataCell>{data.kode}</CTableDataCell>
                            <CTableDataCell>{data.name}</CTableDataCell>
                            <CTableDataCell>{data.kategori}</CTableDataCell>
                            <CTableDataCell width={'40%'}>
                              <ShowMoreText
                                  lines={3}
                                  more='Tampilkan Detail'
                                  less='Kecilkan'
                                  anchorClass=''
                                  className=''
                                  expanded={false}
                                  truncatedEndingComponent={"..... "}
                              >
                                {data.deskripsi}
                              </ShowMoreText>
                            </CTableDataCell>
                            <CTableDataCell>
                                <CButton color="warning" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleEdit(data.id)}>
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton color="danger" className="mb-1 mt-1 px-3 mx-1" onClick={() => handleDelete(data.id)}>
                                    <CIcon icon={cilTrash} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
                <CPagination align="end" style={{marginRight:"40px",marginTop:"2ren",marginLeft:'auto'}}>
                <ResponsivePagination
                  total={theDatas?.data.last_page ? theDatas.data.last_page :1}
                  current={page}
                  onPageChange={(page) => setPage(page)}
                />
              </CPagination>
            </>       
          )}
          {isFetching ? <span> Loading...</span> : null}{' '}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Gejala

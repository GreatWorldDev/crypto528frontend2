/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-expressions */
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../Loading'

interface Props {
  isfollowing: boolean
  data: any
  showModal: boolean
  modalLoading: boolean
  toggleModal: () => void
  onFollowings: () => void
  onFollowers: () => void
}

export const Modal = ({
  isfollowing,
  data,
  showModal,
  modalLoading,
  toggleModal,
  onFollowings,
  onFollowers,
}: Props) => {
  const [show, setShow] = useState(isfollowing)

  return (
    <>
      {showModal ? (
        <>
          <div className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 flex outline-none focus:outline-none justify-center items-center text-white">
            <div className="relative w-11/12 sm:w-4/5 my-6 mx-auto max-w-2xl">
              <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-body outline-none focus:outline-none py-4 px-8">
                <div className="flex items-start justify-between p-5 border-b border-create rounded-t">
                  <div className="flex">
                    <div
                      className="text-xl text-center cursor-pointer"
                      onClick={() => {
                        isfollowing ? onFollowings() : onFollowers()
                      }}
                    >
                      {isfollowing ? 'Followings' : 'Followers'}
                    </div>
                  </div>
                  <button
                    className="p-1 ml-auto bg-transparent text-gray-300 float-right text-xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      toggleModal()
                    }}
                  >
                    X
                  </button>
                </div>
                <div className="relative p-6 flex-auto overflow-y-auto">
                  {modalLoading ? (
                    <p className="mx-auto">Loading...</p>
                  ) : (
                    <>
                      {data.length > 0 ? (
                        data.map((x: any, index: number) => (
                          <div
                            className="flex justify-between items-center text-white mb-6"
                            key={`Follower-${index}`}
                          >
                            <div className="relative flex items-center mr-3">
                              <img
                                src={x.avatarImage || '/images/avatar-alt.png'}
                                width="44px"
                                className="avatar"
                                height="44px"
                                alt=""
                              />
                              <div>
                                <div className="text-md ml-3 .max150">
                                  {x.userName || 'Unknown'}
                                </div>
                                <p className="ml-6 userName">
                                  {x.nickName || 'Unknown'}
                                </p>
                              </div>
                            </div>
                            <Link to={`/profile/${x.id}`}>
                              <a
                                className="bg-btn-main size-auto"
                                onClick={toggleModal}
                              >
                                View
                              </a>
                            </Link>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-md py-16">
                          No {isfollowing ? 'followings' : 'followers'} yet.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex opacity-25 fixed inset-0 z-40 bg-white"
            onClick={() => {
              toggleModal()
            }}
          ></div>
        </>
      ) : null}
    </>
  )
}

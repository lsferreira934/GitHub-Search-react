import React, { useState, useEffect } from 'react';
import UrlImg from './Components/UrlImg';

import Followers from './Components/Followers';
import Following from './Components/Following';
import InputUser from './Components/InputUser';
import 'materialize-css';

export default function App() {
  const [apiGit, setApiGit] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const asyncApi = async () => {
      // const configOauth = {
      //   headers: {
      //     Authorization: 'TOKEN DEVELOPER',
      //   },
      // };
      try {
        const response = await fetch(`https://api.github.com/users/${input}`);

        const data = await response.json();

        const array = [data];
        const apiGitMap = array.map((user) => {
          return {
            id: user.id,
            login: user.login,
            name: user.name,
            foto: user.avatar_url,
            bio: user.bio,
            location: user.location,
            publicRepos: user.public_repos,
            followers: user.followers,
            following: user.following,
            usersFollowers: user.followers_url,
            usersFollowing: user.following_url,
          };
        });

        setApiGit(apiGitMap);
      } catch (error) {
        console.log(error);
      }
    };
    asyncApi();
  }, [input]);

  const handleValueInput = (valueInput) => {
    setInput(valueInput);
  };

  return (
    <div className="container">
      <div className="card-panel hoverable" style={{ borderRadius: '8px' }}>
        <h2 className="center-align">Search Users</h2>
        <div className="row">
          <InputUser onValueInput={handleValueInput} />
        </div>
      </div>

      {apiGit.map(
        ({
          id,
          name,
          foto,
          bio,
          location,
          publicRepos,
          followers,
          following,
          usersFollowers,
          usersFollowing,
        }) => {
          return (
            <div key={1} style={{ textAlign: '-webkit-center' }}>
              <div
                className="preloader-wrapper big active"
                style={
                  id === undefined
                    ? {
                        display: 'block',

                        marginTop: '200px',
                      }
                    : { display: 'none' }
                }
              >
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle"></div>
                  </div>
                  <div className="gap-patch">
                    <div className="circle"></div>
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle"></div>
                  </div>
                </div>
              </div>
              <div
                className="col s10 m5"
                style={
                  id === undefined ? { display: 'none' } : { display: 'block' }
                }
              >
                <div className="card" style={{ borderRadius: '8px' }}>
                  <div className="row">
                    <div className="col s12 m12 l7">
                      <div className="card-content">
                        <div className="card-image">
                          <UrlImg srcImg={foto} />
                        </div>
                      </div>
                    </div>
                    <div className="col s12 m12 l5">
                      <div className="card-content">
                        <ul className="collection with-header">
                          <li className="collection-header">
                            <h4>{name}</h4>
                          </li>
                          <li className="collection-item">
                            <div>
                              <span>
                                <strong>Bio: </strong>
                              </span>
                              <span className=""> {bio}</span>
                            </div>
                          </li>
                          <li className="collection-item">
                            <div>
                              <span>
                                <strong>location: </strong>
                              </span>
                              <span className="">{location}</span>
                            </div>
                          </li>
                          <li className="collection-item">
                            <div>
                              <span>
                                <strong>Public Repositoris: </strong>
                              </span>
                              <span className="chip red">{publicRepos}</span>
                            </div>
                          </li>

                          <li className="collection-item">
                            <div>
                              <span>
                                <strong>Followers: </strong>
                              </span>
                              <span className="chip blue">
                                <Followers followersCont={followers} />
                              </span>
                            </div>
                          </li>

                          <li className="collection-item">
                            <div>
                              <span>
                                <strong>following: </strong>
                              </span>
                              <span className="chip red">
                                <Following followingCont={following} />
                              </span>
                            </div>
                            <div className="card-action">
                              <a href={usersFollowers}>Followers</a>
                              <a href={usersFollowing}>Following</a>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}

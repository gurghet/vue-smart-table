



<!DOCTYPE html>
<html lang="en" class=" is-copy-enabled is-u2f-enabled">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>

    <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/frameworks-46094950e058d2cf30542982edfa17467b40fef171a28a786bdae50fab15526e.css" integrity="sha256-RglJUOBY0s8wVCmC7foXRntA/vFxoop4a9rlD6sVUm4=" media="all" rel="stylesheet" />
    <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/github-65eae0e61ee036b2612ade2e43f38c8dea398a79f76be2aa2abebc4e52d4ccbe.css" integrity="sha256-Zerg5h7gNrJhKt4uQ/OMjeo5inn3a+KqKr68TlLUzL4=" media="all" rel="stylesheet" />
    
    
    
    
    

    <link as="script" href="https://assets-cdn.github.com/assets/frameworks-f2de4c863a487a877150989f965232bacfde178abf9c1963d9f84c5c19916f0c.js" rel="preload" />
    
    <link as="script" href="https://assets-cdn.github.com/assets/github-8922cd0a72e7d62c01c9622b2ac8c62afcd4114585de13349346cc789d65ad81.js" rel="preload" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    <meta name="viewport" content="width=device-width">
    
    
    <title>vue-smart-table/vue-smart-table.js at master · gurghet/vue-smart-table</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
    <meta property="fb:app_id" content="1401488693436528">

      <meta content="https://avatars2.githubusercontent.com/u/420735?v=3&amp;s=400" name="twitter:image:src" /><meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="gurghet/vue-smart-table" name="twitter:title" /><meta content="vue-smart-table - :dog2:Such table, very enterprise, many nested components, wow!" name="twitter:description" />
      <meta content="https://avatars2.githubusercontent.com/u/420735?v=3&amp;s=400" property="og:image" /><meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="gurghet/vue-smart-table" property="og:title" /><meta content="https://github.com/gurghet/vue-smart-table" property="og:url" /><meta content="vue-smart-table - :dog2:Such table, very enterprise, many nested components, wow!" property="og:description" />
      <meta name="browser-stats-url" content="https://api.github.com/_private/browser/stats">
    <meta name="browser-errors-url" content="https://api.github.com/_private/browser/errors">
    <link rel="assets" href="https://assets-cdn.github.com/">
    <link rel="web-socket" href="wss://live.github.com/_sockets/NDIwNzM1OmM3NTU1MTI3MGM1NmNmMzgyZDRkZmI0NTk5MDhmNzM1OmZiMmRhNGM0ZWZkNTA2NmYzN2RiMWFlOGNjM2Y5YTA5NDZlZGYzODI4MTEzOGIyNmVlNDA1M2U2Yjc5ODJlMjI=--2a37dd243f0a8e27895a8c653d071b866d5588d2">
    <meta name="pjax-timeout" content="1000">
    <link rel="sudo-modal" href="/sessions/sudo_modal">

    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="selected-link" value="repo_source" data-pjax-transient>

    <meta name="google-site-verification" content="KT5gs8h0wvaagLKAVWq8bbeNwnZZK1r1XQysX3xurLU">
<meta name="google-site-verification" content="ZzhVyEFwb7w3e0-uOTltm8Jsck2F5StVihD0exw2fsA">
    <meta name="google-analytics" content="UA-3769691-2">

<meta content="collector.githubapp.com" name="octolytics-host" /><meta content="github" name="octolytics-app-id" /><meta content="02E4519C:1251:CF0ED33:577CBAD1" name="octolytics-dimension-request_id" /><meta content="420735" name="octolytics-actor-id" /><meta content="gurghet" name="octolytics-actor-login" /><meta content="6acdd1456b8f551ec5b394cb21c6d01d1bd8db7af03e79089bd64006f39bbcec" name="octolytics-actor-hash" />
<meta content="/&lt;user-name&gt;/&lt;repo-name&gt;/blob/show" data-pjax-transient="true" name="analytics-location" />



  <meta class="js-ga-set" name="dimension1" content="Logged In">



        <meta name="hostname" content="github.com">
    <meta name="user-login" content="gurghet">

        <meta name="expected-hostname" content="github.com">
      <meta name="js-proxy-site-detection-payload" content="MDYyMzI1ZmEzYTgxMzdlNTY3ZDhlOWIzYTE4MDRkMDg5NDVjN2ZkNjRlZTMzYzFlNTY2MWJiM2Y5OTBiNjA3M3x7InJlbW90ZV9hZGRyZXNzIjoiMi4yMjguODEuMTU2IiwicmVxdWVzdF9pZCI6IjAyRTQ1MTlDOjEyNTE6Q0YwRUQzMzo1NzdDQkFEMSIsInRpbWVzdGFtcCI6MTQ2Nzc5MjA4OH0=">


      <link rel="mask-icon" href="https://assets-cdn.github.com/pinned-octocat.svg" color="#4078c0">
      <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">

    <meta name="html-safe-nonce" content="e4bbc4889bbaac1b18f929c44d6f8a0a251b9e3c">
    <meta content="f17ab7baa799af6be6ef7aa926f2b8db3de9d9b7" name="form-nonce" />

    <meta http-equiv="x-pjax-version" content="d43371b6616f0e920351e907f7dc41c3">
    

      
  <meta name="description" content="vue-smart-table - :dog2:Such table, very enterprise, many nested components, wow!">
  <meta name="go-import" content="github.com/gurghet/vue-smart-table git https://github.com/gurghet/vue-smart-table.git">

  <meta content="420735" name="octolytics-dimension-user_id" /><meta content="gurghet" name="octolytics-dimension-user_login" /><meta content="59932596" name="octolytics-dimension-repository_id" /><meta content="gurghet/vue-smart-table" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="59932596" name="octolytics-dimension-repository_network_root_id" /><meta content="gurghet/vue-smart-table" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/gurghet/vue-smart-table/commits/master.atom" rel="alternate" title="Recent Commits to vue-smart-table:master" type="application/atom+xml">


      <link rel="canonical" href="https://github.com/gurghet/vue-smart-table/blob/master/dist/static/vue-smart-table.js" data-pjax-transient>
  </head>


  <body class="logged-in   env-production windows vis-public page-blob">
    <div id="js-pjax-loader-bar" class="pjax-loader-bar"></div>
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>

    
    
    



        <div class="header header-logged-in true" role="banner">
  <div class="container clearfix">

    <a class="header-logo-invertocat" href="https://github.com/" data-hotkey="g d" aria-label="Homepage" data-ga-click="Header, go to dashboard, icon:logo">
  <svg aria-hidden="true" class="octicon octicon-mark-github" height="28" version="1.1" viewBox="0 0 16 16" width="28"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
</a>


        <div class="header-search scoped-search site-scoped-search js-site-search" role="search">
  <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/gurghet/vue-smart-table/search" class="js-site-search-form" data-scoped-search-url="/gurghet/vue-smart-table/search" data-unscoped-search-url="/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
    <label class="form-control header-search-wrapper js-chromeless-input-container">
      <div class="header-search-scope">This repository</div>
      <input type="text"
        class="form-control header-search-input js-site-search-focus js-site-search-field is-clearable"
        data-hotkey="s"
        name="q"
        placeholder="Search"
        aria-label="Search this repository"
        data-unscoped-placeholder="Search GitHub"
        data-scoped-placeholder="Search"
        tabindex="1"
        autocapitalize="off">
    </label>
</form></div>


      <ul class="header-nav left" role="navigation">
        <li class="header-nav-item">
          <a href="/pulls" class="js-selected-navigation-item header-nav-link" data-ga-click="Header, click, Nav menu - item:pulls context:user" data-hotkey="g p" data-selected-links="/pulls /pulls/assigned /pulls/mentioned /pulls">
            Pull requests
</a>        </li>
        <li class="header-nav-item">
          <a href="/issues" class="js-selected-navigation-item header-nav-link" data-ga-click="Header, click, Nav menu - item:issues context:user" data-hotkey="g i" data-selected-links="/issues /issues/assigned /issues/mentioned /issues">
            Issues
</a>        </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="https://gist.github.com/" data-ga-click="Header, go to gist, text:gist">Gist</a>
          </li>
      </ul>

    
<ul class="header-nav user-nav right" id="user-links">
  <li class="header-nav-item">
    
    <a href="/notifications" aria-label="You have unread notifications" class="header-nav-link notification-indicator tooltipped tooltipped-s js-socket-channel js-notification-indicator" data-channel="tenant:1:notification-changed:420735" data-ga-click="Header, go to notifications, icon:unread" data-hotkey="g n">
        <span class="mail-status unread"></span>
        <svg aria-hidden="true" class="octicon octicon-bell" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z"></path></svg>
</a>
  </li>

  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link tooltipped tooltipped-s js-menu-target" href="/new"
       aria-label="Create new…"
       data-ga-click="Header, create new, icon:add">
      <svg aria-hidden="true" class="octicon octicon-plus left" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 9H7v5H5V9H0V7h5V2h2v5h5z"></path></svg>
      <span class="dropdown-caret"></span>
    </a>

    <div class="dropdown-menu-content js-menu-content">
      <ul class="dropdown-menu dropdown-menu-sw">
        
<a class="dropdown-item" href="/new" data-ga-click="Header, create new repository">
  New repository
</a>

  <a class="dropdown-item" href="/new/import" data-ga-click="Header, import a repository">
    Import repository
  </a>


  <a class="dropdown-item" href="/organizations/new" data-ga-click="Header, create new organization">
    New organization
  </a>



  <div class="dropdown-divider"></div>
  <div class="dropdown-header">
    <span title="gurghet/vue-smart-table">This repository</span>
  </div>
    <a class="dropdown-item" href="/gurghet/vue-smart-table/issues/new" data-ga-click="Header, create new issue">
      New issue
    </a>
    <a class="dropdown-item" href="/gurghet/vue-smart-table/settings/collaboration" data-ga-click="Header, create new collaborator">
      New collaborator
    </a>

      </ul>
    </div>
  </li>

  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link name tooltipped tooltipped-sw js-menu-target" href="/gurghet"
       aria-label="View profile and more"
       data-ga-click="Header, show menu, icon:avatar">
      <img alt="@gurghet" class="avatar" height="20" src="https://avatars0.githubusercontent.com/u/420735?v=3&amp;s=40" width="20" />
      <span class="dropdown-caret"></span>
    </a>

    <div class="dropdown-menu-content js-menu-content">
      <div class="dropdown-menu dropdown-menu-sw">
        <div class="dropdown-header header-nav-current-user css-truncate">
          Signed in as <strong class="css-truncate-target">gurghet</strong>
        </div>

        <div class="dropdown-divider"></div>

        <a class="dropdown-item" href="/gurghet" data-ga-click="Header, go to profile, text:your profile">
          Your profile
        </a>
        <a class="dropdown-item" href="/stars" data-ga-click="Header, go to starred repos, text:your stars">
          Your stars
        </a>
        <a class="dropdown-item" href="/explore" data-ga-click="Header, go to explore, text:explore">
          Explore
        </a>
          <a class="dropdown-item" href="/integrations" data-ga-click="Header, go to integrations, text:integrations">
            Integrations
          </a>
        <a class="dropdown-item" href="https://help.github.com" data-ga-click="Header, go to help, text:help">
          Help
        </a>


        <div class="dropdown-divider"></div>

        <a class="dropdown-item" href="/settings/profile" data-ga-click="Header, go to settings, icon:settings">
          Settings
        </a>

        <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/logout" class="logout-form" data-form-nonce="f17ab7baa799af6be6ef7aa926f2b8db3de9d9b7" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="ArZtTgA0urbz1CfoKYakhT2R5uWcaJiOo63puCEymPhTIlvkMTCHzy73Gqke5c6B7n8Nl/oP1oaQWxyaoc8zTQ==" /></div>
          <button class="dropdown-item dropdown-signout" data-ga-click="Header, sign out, icon:logout">
            Sign out
          </button>
</form>      </div>
    </div>
  </li>
</ul>


    
  </div>
</div>


      


    <div id="start-of-content" class="accessibility-aid"></div>

      <div id="js-flash-container">
</div>


    <div role="main" class="main-content">
        <div itemscope itemtype="http://schema.org/SoftwareSourceCode">
    <div id="js-repo-pjax-container" data-pjax-container>
      
<div class="pagehead repohead instapaper_ignore readability-menu experiment-repo-nav">
  <div class="container repohead-details-container">

    

<ul class="pagehead-actions">

  <li>
        <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/notifications/subscribe" class="js-social-container" data-autosubmit="true" data-form-nonce="f17ab7baa799af6be6ef7aa926f2b8db3de9d9b7" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="sOs6T0RMGgBEfQS+G7hrEtqPfVu5vIM3zMtNji9xJH5/fRoDJ2Ap/sw6GDVPJ10SdF2lTTvFwkcwLtRUkcv3Nw==" /></div>      <input class="form-control" id="repository_id" name="repository_id" type="hidden" value="59932596" />

        <div class="select-menu js-menu-container js-select-menu">
          <a href="/gurghet/vue-smart-table/subscription"
            class="btn btn-sm btn-with-count select-menu-button js-menu-target" role="button" tabindex="0" aria-haspopup="true"
            data-ga-click="Repository, click Watch settings, action:blob#show">
            <span class="js-select-button">
              <svg aria-hidden="true" class="octicon octicon-eye" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
              Unwatch
            </span>
          </a>
          <a class="social-count js-social-count" href="/gurghet/vue-smart-table/watchers">
            2
          </a>

        <div class="select-menu-modal-holder">
          <div class="select-menu-modal subscription-menu-modal js-menu-content" aria-hidden="true">
            <div class="select-menu-header js-navigation-enable" tabindex="-1">
              <svg aria-label="Close" class="octicon octicon-x js-menu-close" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg>
              <span class="select-menu-title">Notifications</span>
            </div>

              <div class="select-menu-list js-navigation-container" role="menu">

                <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
                  <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
                  <div class="select-menu-item-text">
                    <input id="do_included" name="do" type="radio" value="included" />
                    <span class="select-menu-item-heading">Not watching</span>
                    <span class="description">Be notified when participating or @mentioned.</span>
                    <span class="js-select-button-text hidden-select-button-text">
                      <svg aria-hidden="true" class="octicon octicon-eye" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                      Watch
                    </span>
                  </div>
                </div>

                <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0">
                  <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
                  <div class="select-menu-item-text">
                    <input checked="checked" id="do_subscribed" name="do" type="radio" value="subscribed" />
                    <span class="select-menu-item-heading">Watching</span>
                    <span class="description">Be notified of all conversations.</span>
                    <span class="js-select-button-text hidden-select-button-text">
                      <svg aria-hidden="true" class="octicon octicon-eye" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M8.06 2C3 2 0 8 0 8s3 6 8.06 6C13 14 16 8 16 8s-3-6-7.94-6zM8 12c-2.2 0-4-1.78-4-4 0-2.2 1.8-4 4-4 2.22 0 4 1.8 4 4 0 2.22-1.78 4-4 4zm2-4c0 1.11-.89 2-2 2-1.11 0-2-.89-2-2 0-1.11.89-2 2-2 1.11 0 2 .89 2 2z"></path></svg>
                      Unwatch
                    </span>
                  </div>
                </div>

                <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
                  <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
                  <div class="select-menu-item-text">
                    <input id="do_ignore" name="do" type="radio" value="ignore" />
                    <span class="select-menu-item-heading">Ignoring</span>
                    <span class="description">Never be notified.</span>
                    <span class="js-select-button-text hidden-select-button-text">
                      <svg aria-hidden="true" class="octicon octicon-mute" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"></path></svg>
                      Stop ignoring
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
</form>
  </li>

  <li>
    
  <div class="js-toggler-container js-social-container starring-container on">

    <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/gurghet/vue-smart-table/unstar" class="starred" data-form-nonce="f17ab7baa799af6be6ef7aa926f2b8db3de9d9b7" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="YQtCDwg4D7T/n4FLg5NWZoadGGrEFwoopnINzHRtlwXwHTpqXmzhLkK0VBvgIEy7GRtIFrzvLx/ShP4TuRkZ/A==" /></div>
      <button
        class="btn btn-sm btn-with-count js-toggler-target"
        aria-label="Unstar this repository" title="Unstar gurghet/vue-smart-table"
        data-ga-click="Repository, click unstar button, action:blob#show; text:Unstar">
        <svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
        Unstar
      </button>
        <a class="social-count js-social-count" href="/gurghet/vue-smart-table/stargazers">
          10
        </a>
</form>
    <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/gurghet/vue-smart-table/star" class="unstarred" data-form-nonce="f17ab7baa799af6be6ef7aa926f2b8db3de9d9b7" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="QuDEV2Rd+W1R8GGTZbR0TB6ycf/2Kt1Wwcr9Kn+voFr4fEj51s+LPFcCmnaJv1p6xaOCygC20R8xSe7+JGtVew==" /></div>
      <button
        class="btn btn-sm btn-with-count js-toggler-target"
        aria-label="Star this repository" title="Star gurghet/vue-smart-table"
        data-ga-click="Repository, click star button, action:blob#show; text:Star">
        <svg aria-hidden="true" class="octicon octicon-star" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>
        Star
      </button>
        <a class="social-count js-social-count" href="/gurghet/vue-smart-table/stargazers">
          10
        </a>
</form>  </div>

  </li>

  <li>
          <a href="#fork-destination-box" class="btn btn-sm btn-with-count"
              title="Fork your own copy of gurghet/vue-smart-table to your account"
              aria-label="Fork your own copy of gurghet/vue-smart-table to your account"
              rel="facebox"
              data-ga-click="Repository, show fork modal, action:blob#show; text:Fork">
              <svg aria-hidden="true" class="octicon octicon-repo-forked" height="16" version="1.1" viewBox="0 0 10 16" width="10"><path d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
            Fork
          </a>

          <div id="fork-destination-box" style="display: none;">
            <h2 class="facebox-header" data-facebox-id="facebox-header">Where should we fork this repository?</h2>
            <include-fragment src=""
                class="js-fork-select-fragment fork-select-fragment"
                data-url="/gurghet/vue-smart-table/fork?fragment=1">
              <img alt="Loading" height="64" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-128.gif" width="64" />
            </include-fragment>
          </div>

    <a href="/gurghet/vue-smart-table/network" class="social-count">
      1
    </a>
  </li>
</ul>

    <h1 class="public ">
  <svg aria-hidden="true" class="octicon octicon-repo" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
  <span class="author" itemprop="author"><a href="/gurghet" class="url fn" rel="author">gurghet</a></span><!--
--><span class="path-divider">/</span><!--
--><strong itemprop="name"><a href="/gurghet/vue-smart-table" data-pjax="#js-repo-pjax-container">vue-smart-table</a></strong>

</h1>

  </div>
  <div class="container">
    
<nav class="reponav js-repo-nav js-sidenav-container-pjax"
     itemscope
     itemtype="http://schema.org/BreadcrumbList"
     role="navigation"
     data-pjax="#js-repo-pjax-container">

  <span itemscope itemtype="http://schema.org/ListItem" itemprop="itemListElement">
    <a href="/gurghet/vue-smart-table" aria-selected="true" class="js-selected-navigation-item selected reponav-item" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /gurghet/vue-smart-table" itemprop="url">
      <svg aria-hidden="true" class="octicon octicon-code" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"></path></svg>
      <span itemprop="name">Code</span>
      <meta itemprop="position" content="1">
</a>  </span>

    <span itemscope itemtype="http://schema.org/ListItem" itemprop="itemListElement">
      <a href="/gurghet/vue-smart-table/issues" class="js-selected-navigation-item reponav-item" data-hotkey="g i" data-selected-links="repo_issues repo_labels repo_milestones /gurghet/vue-smart-table/issues" itemprop="url">
        <svg aria-hidden="true" class="octicon octicon-issue-opened" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
        <span itemprop="name">Issues</span>
        <span class="counter">2</span>
        <meta itemprop="position" content="2">
</a>    </span>

  <span itemscope itemtype="http://schema.org/ListItem" itemprop="itemListElement">
    <a href="/gurghet/vue-smart-table/pulls" class="js-selected-navigation-item reponav-item" data-hotkey="g p" data-selected-links="repo_pulls /gurghet/vue-smart-table/pulls" itemprop="url">
      <svg aria-hidden="true" class="octicon octicon-git-pull-request" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M11 11.28V5c-.03-.78-.34-1.47-.94-2.06C9.46 2.35 8.78 2.03 8 2H7V0L4 3l3 3V4h1c.27.02.48.11.69.31.21.2.3.42.31.69v6.28A1.993 1.993 0 0 0 10 15a1.993 1.993 0 0 0 1-3.72zm-1 2.92c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zM4 3c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v6.56A1.993 1.993 0 0 0 2 15a1.993 1.993 0 0 0 1-3.72V4.72c.59-.34 1-.98 1-1.72zm-.8 10c0 .66-.55 1.2-1.2 1.2-.65 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
      <span itemprop="name">Pull requests</span>
      <span class="counter">0</span>
      <meta itemprop="position" content="3">
</a>  </span>

    <a href="/gurghet/vue-smart-table/wiki" class="js-selected-navigation-item reponav-item" data-hotkey="g w" data-selected-links="repo_wiki /gurghet/vue-smart-table/wiki">
      <svg aria-hidden="true" class="octicon octicon-book" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M3 5h4v1H3V5zm0 3h4V7H3v1zm0 2h4V9H3v1zm11-5h-4v1h4V5zm0 2h-4v1h4V7zm0 2h-4v1h4V9zm2-6v9c0 .55-.45 1-1 1H9.5l-1 1-1-1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h5.5l1 1 1-1H15c.55 0 1 .45 1 1zm-8 .5L7.5 3H2v9h6V3.5zm7-.5H9.5l-.5.5V12h6V3z"></path></svg>
      Wiki
</a>

  <a href="/gurghet/vue-smart-table/pulse" class="js-selected-navigation-item reponav-item" data-selected-links="pulse /gurghet/vue-smart-table/pulse">
    <svg aria-hidden="true" class="octicon octicon-pulse" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M11.5 8L8.8 5.4 6.6 8.5 5.5 1.6 2.38 8H0v2h3.6l.9-1.8.9 5.4L9 8.5l1.6 1.5H14V8z"></path></svg>
    Pulse
</a>
  <a href="/gurghet/vue-smart-table/graphs" class="js-selected-navigation-item reponav-item" data-selected-links="repo_graphs repo_contributors /gurghet/vue-smart-table/graphs">
    <svg aria-hidden="true" class="octicon octicon-graph" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M16 14v1H0V0h1v14h15zM5 13H3V8h2v5zm4 0H7V3h2v10zm4 0h-2V6h2v7z"></path></svg>
    Graphs
</a>
    <a href="/gurghet/vue-smart-table/settings" class="js-selected-navigation-item reponav-item" data-selected-links="repo_settings repo_branch_settings hooks /gurghet/vue-smart-table/settings">
      <svg aria-hidden="true" class="octicon octicon-gear" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M14 8.77v-1.6l-1.94-.64-.45-1.09.88-1.84-1.13-1.13-1.81.91-1.09-.45-.69-1.92h-1.6l-.63 1.94-1.11.45-1.84-.88-1.13 1.13.91 1.81-.45 1.09L0 7.23v1.59l1.94.64.45 1.09-.88 1.84 1.13 1.13 1.81-.91 1.09.45.69 1.92h1.59l.63-1.94 1.11-.45 1.84.88 1.13-1.13-.92-1.81.47-1.09L14 8.75v.02zM7 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"></path></svg>
      Settings
</a>
</nav>

  </div>
</div>

<div class="container new-discussion-timeline experiment-repo-nav">
  <div class="repository-content">

    

<a href="/gurghet/vue-smart-table/blob/30915092f95c617851997f1aa48e3d2c0cb3168a/dist/static/vue-smart-table.js" class="hidden js-permalink-shortcut" data-hotkey="y">Permalink</a>

<!-- blob contrib key: blob_contributors:v21:3f90c39a5994e12e24088dce99424a4f -->

<div class="file-navigation js-zeroclipboard-container">
  
<div class="select-menu branch-select-menu js-menu-container js-select-menu left">
  <button class="btn btn-sm select-menu-button js-menu-target css-truncate" data-hotkey="w"
    title="master"
    type="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <i>Branch:</i>
    <span class="js-select-button css-truncate-target">master</span>
  </button>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <svg aria-label="Close" class="octicon octicon-x js-menu-close" height="16" role="img" version="1.1" viewBox="0 0 12 16" width="12"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg>
        <span class="select-menu-title">Switch branches/tags</span>
      </div>

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Find or create a branch…" id="context-commitish-filter-field" class="form-control js-filterable-field js-navigation-enable" placeholder="Find or create a branch…">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" data-filter-placeholder="Find or create a branch…" class="js-select-menu-tab" role="tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" data-filter-placeholder="Find a tag…" class="js-select-menu-tab" role="tab">Tags</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches" role="menu">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <a class="select-menu-item js-navigation-item js-navigation-open "
               href="/gurghet/vue-smart-table/blob/dev/dist/static/vue-smart-table.js"
               data-name="dev"
               data-skip-pjax="true"
               rel="nofollow">
              <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
              <span class="select-menu-item-text css-truncate-target js-select-menu-filter-text" title="dev">
                dev
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
               href="/gurghet/vue-smart-table/blob/gh-pages/dist/static/vue-smart-table.js"
               data-name="gh-pages"
               data-skip-pjax="true"
               rel="nofollow">
              <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
              <span class="select-menu-item-text css-truncate-target js-select-menu-filter-text" title="gh-pages">
                gh-pages
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
               href="/gurghet/vue-smart-table/blob/hotfix%233/dist/static/vue-smart-table.js"
               data-name="hotfix#3"
               data-skip-pjax="true"
               rel="nofollow">
              <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
              <span class="select-menu-item-text css-truncate-target js-select-menu-filter-text" title="hotfix#3">
                hotfix#3
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open selected"
               href="/gurghet/vue-smart-table/blob/master/dist/static/vue-smart-table.js"
               data-name="master"
               data-skip-pjax="true"
               rel="nofollow">
              <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
              <span class="select-menu-item-text css-truncate-target js-select-menu-filter-text" title="master">
                master
              </span>
            </a>
        </div>

          <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/gurghet/vue-smart-table/branches" class="js-create-branch select-menu-item select-menu-new-item-form js-navigation-item js-new-item-form" data-form-nonce="f17ab7baa799af6be6ef7aa926f2b8db3de9d9b7" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="Jkc3wx6oBKXrVz5HPPzyOQ9AydFjLhXg7WujCHPhni7QW8viog21nmtQi1AfBZFuWWIzHt+JAYFXw3oQiAS0Kw==" /></div>
          <svg aria-hidden="true" class="octicon octicon-git-branch select-menu-item-icon" height="16" version="1.1" viewBox="0 0 10 16" width="10"><path d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>
            <div class="select-menu-item-text">
              <span class="select-menu-item-heading">Create branch: <span class="js-new-item-name"></span></span>
              <span class="description">from ‘master’</span>
            </div>
            <input type="hidden" name="name" id="name" class="js-new-item-value">
            <input type="hidden" name="branch" id="branch" value="master">
            <input type="hidden" name="path" id="path" value="dist/static/vue-smart-table.js">
</form>
      </div>

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/gurghet/vue-smart-table/tree/2.3.0/dist/static/vue-smart-table.js"
              data-name="2.3.0"
              data-skip-pjax="true"
              rel="nofollow">
              <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
              <span class="select-menu-item-text css-truncate-target" title="2.3.0">
                2.3.0
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/gurghet/vue-smart-table/tree/2.2.1/dist/static/vue-smart-table.js"
              data-name="2.2.1"
              data-skip-pjax="true"
              rel="nofollow">
              <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
              <span class="select-menu-item-text css-truncate-target" title="2.2.1">
                2.2.1
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/gurghet/vue-smart-table/tree/2.1.1/dist/static/vue-smart-table.js"
              data-name="2.1.1"
              data-skip-pjax="true"
              rel="nofollow">
              <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
              <span class="select-menu-item-text css-truncate-target" title="2.1.1">
                2.1.1
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/gurghet/vue-smart-table/tree/2.1.0/dist/static/vue-smart-table.js"
              data-name="2.1.0"
              data-skip-pjax="true"
              rel="nofollow">
              <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
              <span class="select-menu-item-text css-truncate-target" title="2.1.0">
                2.1.0
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open "
              href="/gurghet/vue-smart-table/tree/2.0.0/dist/static/vue-smart-table.js"
              data-name="2.0.0"
              data-skip-pjax="true"
              rel="nofollow">
              <svg aria-hidden="true" class="octicon octicon-check select-menu-item-icon" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5z"></path></svg>
              <span class="select-menu-item-text css-truncate-target" title="2.0.0">
                2.0.0
              </span>
            </a>
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div>

    </div>
  </div>
</div>

  <div class="btn-group right">
    <a href="/gurghet/vue-smart-table/find/master"
          class="js-pjax-capture-input btn btn-sm"
          data-pjax
          data-hotkey="t">
      Find file
    </a>
    <button aria-label="Copy file path to clipboard" class="js-zeroclipboard btn btn-sm zeroclipboard-button tooltipped tooltipped-s" data-copied-hint="Copied!" type="button">Copy path</button>
  </div>
  <div class="breadcrumb js-zeroclipboard-target">
    <span class="repo-root js-repo-root"><span class="js-path-segment"><a href="/gurghet/vue-smart-table"><span>vue-smart-table</span></a></span></span><span class="separator">/</span><span class="js-path-segment"><a href="/gurghet/vue-smart-table/tree/master/dist"><span>dist</span></a></span><span class="separator">/</span><span class="js-path-segment"><a href="/gurghet/vue-smart-table/tree/master/dist/static"><span>static</span></a></span><span class="separator">/</span><strong class="final-path">vue-smart-table.js</strong>
  </div>
</div>


  <div class="commit-tease">
      <span class="right">
        <a class="commit-tease-sha" href="/gurghet/vue-smart-table/commit/30915092f95c617851997f1aa48e3d2c0cb3168a" data-pjax>
          3091509
        </a>
        <relative-time datetime="2016-07-06T07:55:58Z">Jul 6, 2016</relative-time>
      </span>
      <div>
        <img alt="@gurghet" class="avatar" height="20" src="https://avatars0.githubusercontent.com/u/420735?v=3&amp;s=40" width="20" />
        <a href="/gurghet" class="user-mention" rel="author">gurghet</a>
          <a href="/gurghet/vue-smart-table/commit/30915092f95c617851997f1aa48e3d2c0cb3168a" class="message" data-pjax="true" title="[Fix] Added find polyfill for Chrome for Android">[Fix] Added find polyfill for Chrome for Android</a>
      </div>

    <div class="commit-tease-contributors">
      <button type="button" class="btn-link muted-link contributors-toggle" data-facebox="#blob_contributors_box">
        <strong>1</strong>
         contributor
      </button>
      
    </div>

    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header" data-facebox-id="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list" data-facebox-id="facebox-description">
          <li class="facebox-user-list-item">
            <img alt="@gurghet" height="24" src="https://avatars2.githubusercontent.com/u/420735?v=3&amp;s=48" width="24" />
            <a href="/gurghet">gurghet</a>
          </li>
      </ul>
    </div>
  </div>

<div class="file">
  <div class="file-header">
  <div class="file-actions">

    <div class="btn-group">
      <a href="/gurghet/vue-smart-table/raw/master/dist/static/vue-smart-table.js" class="btn btn-sm " id="raw-url">Raw</a>
        <a href="/gurghet/vue-smart-table/blame/master/dist/static/vue-smart-table.js" class="btn btn-sm js-update-url-with-hash">Blame</a>
      <a href="/gurghet/vue-smart-table/commits/master/dist/static/vue-smart-table.js" class="btn btn-sm " rel="nofollow">History</a>
    </div>

        <a class="btn-octicon tooltipped tooltipped-nw"
           href="https://windows.github.com"
           aria-label="Open this file in GitHub Desktop"
           data-ga-click="Repository, open with desktop, type:windows">
            <svg aria-hidden="true" class="octicon octicon-device-desktop" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M15 2H1c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5.34c-.25.61-.86 1.39-2.34 2h8c-1.48-.61-2.09-1.39-2.34-2H15c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm0 9H1V3h14v8z"></path></svg>
        </a>

        <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/gurghet/vue-smart-table/edit/master/dist/static/vue-smart-table.js" class="inline-form js-update-url-with-hash" data-form-nonce="f17ab7baa799af6be6ef7aa926f2b8db3de9d9b7" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="QBivB3W1DWLwSCzbptDOKGietNLsJBX8WI7NCw0QjtfLenzaGMxtoZGgaYidq1WlqZl5godnsLK05WIX9ArlNQ==" /></div>
          <button class="btn-octicon tooltipped tooltipped-nw" type="submit"
            aria-label="Edit this file" data-hotkey="e" data-disable-with>
            <svg aria-hidden="true" class="octicon octicon-pencil" height="16" version="1.1" viewBox="0 0 14 16" width="14"><path d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"></path></svg>
          </button>
</form>        <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/gurghet/vue-smart-table/delete/master/dist/static/vue-smart-table.js" class="inline-form" data-form-nonce="f17ab7baa799af6be6ef7aa926f2b8db3de9d9b7" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="Zv4mC9Cl61pgpa/VCE7JJNFpH0zq5G4ryJpzTeBVMlRLCib+JHXmn60/MAT6qK67IvrBJcuBRnbQnNHeEWCOzw==" /></div>
          <button class="btn-octicon btn-octicon-danger tooltipped tooltipped-nw" type="submit"
            aria-label="Delete this file" data-disable-with>
            <svg aria-hidden="true" class="octicon octicon-trashcan" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M11 2H9c0-.55-.45-1-1-1H5c-.55 0-1 .45-1 1H2c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1v9c0 .55.45 1 1 1h7c.55 0 1-.45 1-1V5c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 12H3V5h1v8h1V5h1v8h1V5h1v8h1V5h1v9zm1-10H2V3h9v1z"></path></svg>
          </button>
</form>  </div>

  <div class="file-info">
      3 lines (3 sloc)
      <span class="file-info-divider"></span>
    49.5 KB
  </div>
</div>

  

  <div itemprop="text" class="blob-wrapper data type-javascript">
      <table class="highlight tab-size js-file-line-container" data-tab-size="2">
      <tr>
        <td id="L1" class="blob-num js-line-number" data-line-number="1"></td>
        <td id="LC1" class="blob-code blob-code-inner js-file-line">!function(t,e){&quot;object&quot;==typeof exports&amp;&amp;&quot;object&quot;==typeof module?module.exports=e(require(&quot;Vue&quot;)):&quot;function&quot;==typeof define&amp;&amp;define.amd?define([&quot;Vue&quot;],e):&quot;object&quot;==typeof exports?exports.SmartTable=e(require(&quot;Vue&quot;)):t.SmartTable=e(t.Vue)}(this,function(t){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p=&quot;/&quot;,e(0)}([function(t,e,n){&quot;use strict&quot;;n(116);var r=n(151);window.SmartTable=r,&quot;undefined&quot;!=typeof window&amp;&amp;window.Vue&amp;&amp;window.Vue.component(&quot;smart-table&quot;,r),t.exports=r},function(t,e,n){var r=n(35)(&quot;wks&quot;),o=n(23),i=n(3).Symbol,u=&quot;function&quot;==typeof i,s=t.exports=function(t){return r[t]||(r[t]=u&amp;&amp;i[t]||(u?i:o)(&quot;Symbol.&quot;+t))};s.store=r},function(t,e){var n=t.exports={version:&quot;2.4.0&quot;};&quot;number&quot;==typeof __e&amp;&amp;(__e=n)},function(t,e){var n=t.exports=&quot;undefined&quot;!=typeof window&amp;&amp;window.Math==Math?window:&quot;undefined&quot;!=typeof self&amp;&amp;self.Math==Math?self:Function(&quot;return this&quot;)();&quot;number&quot;==typeof __g&amp;&amp;(__g=n)},function(t,e,n){var r=n(11),o=n(48),i=n(37),u=Object.defineProperty;e.f=n(5)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(s){}if(&quot;get&quot;in n||&quot;set&quot;in n)throw TypeError(&quot;Accessors not supported!&quot;);return&quot;value&quot;in n&amp;&amp;(t[e]=n.value),t}},function(t,e,n){t.exports=!n(8)(function(){return 7!=Object.defineProperty({},&quot;a&quot;,{get:function(){return 7}}).a})},function(t,e,n){var r=n(4),o=n(16);t.exports=n(5)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(3),o=n(2),i=n(14),u=n(6),s=&quot;prototype&quot;,c=function(t,e,n){var a,f,l,d=t&amp;c.F,p=t&amp;c.G,h=t&amp;c.S,v=t&amp;c.P,y=t&amp;c.B,m=t&amp;c.W,b=p?o:o[e]||(o[e]={}),x=b[s],w=p?r:h?r[e]:(r[e]||{})[s];p&amp;&amp;(n=e);for(a in n)f=!d&amp;&amp;w&amp;&amp;void 0!==w[a],f&amp;&amp;a in b||(l=f?w[a]:n[a],b[a]=p&amp;&amp;&quot;function&quot;!=typeof w[a]?n[a]:y&amp;&amp;f?i(l,r):m&amp;&amp;w[a]==l?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e[s]=t[s],e}(l):v&amp;&amp;&quot;function&quot;==typeof l?i(Function.call,l):l,v&amp;&amp;((b.virtual||(b.virtual={}))[a]=l,t&amp;c.R&amp;&amp;x&amp;&amp;!x[a]&amp;&amp;u(x,a,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,t.exports=c},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(28),o=n(19);t.exports=function(t){return r(o(t))}},function(t,e,n){var r=n(12);t.exports=function(t){if(!r(t))throw TypeError(t+&quot; is not an object!&quot;);return t}},function(t,e){t.exports=function(t){return&quot;object&quot;==typeof t?null!==t:&quot;function&quot;==typeof t}},function(t,e,n){var r=n(54),o=n(26);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e,n){var r=n(82);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports={}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&amp;t),configurable:!(2&amp;t),writable:!(4&amp;t),value:e}}},function(t,e,n){var r=n(19);t.exports=function(t){return Object(r(t))}},function(t,e){var n=t.exports=&quot;undefined&quot;!=typeof window&amp;&amp;window.Math==Math?window:&quot;undefined&quot;!=typeof self&amp;&amp;self.Math==Math?self:Function(&quot;return this&quot;)();&quot;number&quot;==typeof __g&amp;&amp;(__g=n)},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError(&quot;Can&#39;t call method on  &quot;+t);return t}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var r=n(4).f,o=n(9),i=n(1)(&quot;toStringTag&quot;);t.exports=function(t,e,n){t&amp;&amp;!o(t=n?t:t.prototype,i)&amp;&amp;r(t,i,{configurable:!0,value:e})}},function(t,e,n){var r=n(36),o=Math.min;t.exports=function(t){return t&gt;0?o(r(t),9007199254740991):0}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return&quot;Symbol(&quot;.concat(void 0===t?&quot;&quot;:t,&quot;)_&quot;,(++n+r).toString(36))}},function(t,e){t.exports=function(t){return&quot;object&quot;==typeof t?null!==t:&quot;function&quot;==typeof t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=&quot;constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf&quot;.split(&quot;,&quot;)},function(t,e,n){var r=n(14),o=n(51),i=n(49),u=n(11),s=n(22),c=n(57),a={},f={},e=t.exports=function(t,e,n,l,d){var p,h,v,y,m=d?function(){return t}:c(t),b=r(n,l,e?2:1),x=0;if(&quot;function&quot;!=typeof m)throw TypeError(t+&quot; is not iterable!&quot;);if(i(m)){for(p=s(t.length);p&gt;x;x++)if(y=e?b(u(h=t[x])[0],h[1]):b(t[x]),y===a||y===f)return y}else for(v=m.call(t);!(h=v.next()).done;)if(y=o(v,b,h.value,e),y===a||y===f)return y};e.BREAK=a,e.RETURN=f},function(t,e,n){var r=n(25);t.exports=Object(&quot;z&quot;).propertyIsEnumerable(0)?Object:function(t){return&quot;String&quot;==r(t)?t.split(&quot;&quot;):Object(t)}},function(t,e,n){&quot;use strict&quot;;var r=n(30),o=n(7),i=n(56),u=n(6),s=n(9),c=n(15),a=n(95),f=n(21),l=n(102),d=n(1)(&quot;iterator&quot;),p=!([].keys&amp;&amp;&quot;next&quot;in[].keys()),h=&quot;@@iterator&quot;,v=&quot;keys&quot;,y=&quot;values&quot;,m=function(){return this};t.exports=function(t,e,n,b,x,w,g){a(n,e,b);var _,S,O,E=function(t){if(!p&amp;&amp;t in j)return j[t];switch(t){case v:return function(){return new n(this,t)};case y:return function(){return new n(this,t)}}return function(){return new n(this,t)}},k=e+&quot; Iterator&quot;,C=x==y,A=!1,j=t.prototype,$=j[d]||j[h]||x&amp;&amp;j[x],F=$||E(x),M=x?C?E(&quot;entries&quot;):F:void 0,P=&quot;Array&quot;==e?j.entries||$:$;if(P&amp;&amp;(O=l(P.call(new t)),O!==Object.prototype&amp;&amp;(f(O,k,!0),r||s(O,d)||u(O,d,m))),C&amp;&amp;$&amp;&amp;$.name!==y&amp;&amp;(A=!0,F=function(){return $.call(this)}),r&amp;&amp;!g||!p&amp;&amp;!A&amp;&amp;j[d]||u(j,d,F),c[e]=F,c[k]=m,x)if(_={values:C?F:E(y),keys:w?F:E(v),entries:M},g)for(S in _)S in j||i(j,S,_[S]);else o(o.P+o.F*(p||A),e,_);return _}},function(t,e){t.exports=!0},function(t,e,n){var r=n(23)(&quot;meta&quot;),o=n(12),i=n(9),u=n(4).f,s=0,c=Object.isExtensible||function(){return!0},a=!n(8)(function(){return c(Object.preventExtensions({}))}),f=function(t){u(t,r,{value:{i:&quot;O&quot;+ ++s,w:{}}})},l=function(t,e){if(!o(t))return&quot;symbol&quot;==typeof t?t:(&quot;string&quot;==typeof t?&quot;S&quot;:&quot;P&quot;)+t;if(!i(t,r)){if(!c(t))return&quot;F&quot;;if(!e)return&quot;E&quot;;f(t)}return t[r].i},d=function(t,e){if(!i(t,r)){if(!c(t))return!0;if(!e)return!1;f(t)}return t[r].w},p=function(t){return a&amp;&amp;h.NEED&amp;&amp;c(t)&amp;&amp;!i(t,r)&amp;&amp;f(t),t},h=t.exports={KEY:r,NEED:!1,fastKey:l,getWeak:d,onFreeze:p}},function(t,e,n){var r=n(11),o=n(99),i=n(26),u=n(34)(&quot;IE_PROTO&quot;),s=function(){},c=&quot;prototype&quot;,a=function(){var t,e=n(47)(&quot;iframe&quot;),r=i.length,o=&quot;&gt;&quot;;for(e.style.display=&quot;none&quot;,n(94).appendChild(e),e.src=&quot;javascript:&quot;,t=e.contentWindow.document,t.open(),t.write(&quot;&lt;script&gt;document.F=Object&lt;/script&quot;+o),t.close(),a=t.F;r--;)delete a[c][i[r]];return a()};t.exports=Object.create||function(t,e){var n;return null!==t?(s[c]=r(t),n=new s,s[c]=null,n[u]=t):n=a(),void 0===e?n:o(n,e)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var r=n(35)(&quot;keys&quot;),o=n(23);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(3),o=&quot;__core-js_shared__&quot;,i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t&gt;0?r:n)(t)}},function(t,e,n){var r=n(12);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&amp;&amp;&quot;function&quot;==typeof(n=t.toString)&amp;&amp;!r(o=n.call(t)))return o;if(&quot;function&quot;==typeof(n=t.valueOf)&amp;&amp;!r(o=n.call(t)))return o;if(!e&amp;&amp;&quot;function&quot;==typeof(n=t.toString)&amp;&amp;!r(o=n.call(t)))return o;throw TypeError(&quot;Can&#39;t convert object to primitive value&quot;)}},function(t,e,n){var r=n(3),o=n(2),i=n(30),u=n(39),s=n(4).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});&quot;_&quot;==t.charAt(0)||t in e||s(e,t,{value:u.f(t)})}},function(t,e,n){e.f=n(1)},function(t,e,n){&quot;use strict&quot;;var r=n(105)(!0);n(29)(String,&quot;String&quot;,function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n&gt;=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e){var n=t.exports={version:&quot;2.4.0&quot;};&quot;number&quot;==typeof __e&amp;&amp;(__e=n)},function(t,e,n){t.exports=!n(62)(function(){return 7!=Object.defineProperty({},&quot;a&quot;,{get:function(){return 7}}).a})},function(t,e,n){var r=n(130),o=n(131);t.exports=n(42)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){t.exports={&quot;default&quot;:n(76),__esModule:!0}},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&amp;&amp;r in t)throw TypeError(n+&quot;: incorrect invocation!&quot;);return t}},function(t,e,n){var r=n(25),o=n(1)(&quot;toStringTag&quot;),i=&quot;Arguments&quot;==r(function(){return arguments}()),u=function(t,e){try{return t[e]}catch(n){}};t.exports=function(t){var e,n,s;return void 0===t?&quot;Undefined&quot;:null===t?&quot;Null&quot;:&quot;string&quot;==typeof(n=u(e=Object(t),o))?n:i?r(e):&quot;Object&quot;==(s=r(e))&amp;&amp;&quot;function&quot;==typeof e.callee?&quot;Arguments&quot;:s}},function(t,e,n){var r=n(12),o=n(3).document,i=r(o)&amp;&amp;r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){t.exports=!n(5)&amp;&amp;!n(8)(function(){return 7!=Object.defineProperty(n(47)(&quot;div&quot;),&quot;a&quot;,{get:function(){return 7}}).a})},function(t,e,n){var r=n(15),o=n(1)(&quot;iterator&quot;),i=Array.prototype;t.exports=function(t){return void 0!==t&amp;&amp;(r.Array===t||i[o]===t)}},function(t,e,n){var r=n(25);t.exports=Array.isArray||function(t){return&quot;Array&quot;==r(t)}},function(t,e,n){var r=n(11);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(i){var u=t[&quot;return&quot;];throw void 0!==u&amp;&amp;r(u.call(t)),i}}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r=n(54),o=n(26).concat(&quot;length&quot;,&quot;prototype&quot;);e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){var r=n(9),o=n(10),i=n(85)(!1),u=n(34)(&quot;IE_PROTO&quot;);t.exports=function(t,e){var n,s=o(t),c=0,a=[];for(n in s)n!=u&amp;&amp;r(s,n)&amp;&amp;a.push(n);for(;e.length&gt;c;)r(s,n=e[c++])&amp;&amp;(~i(a,n)||a.push(n));return a}},function(t,e,n){var r=n(6);t.exports=function(t,e,n){for(var o in e)n&amp;&amp;t[o]?t[o]=e[o]:r(t,o,e[o]);return t}},function(t,e,n){t.exports=n(6)},function(t,e,n){var r=n(46),o=n(1)(&quot;iterator&quot;),i=n(15);t.exports=n(2).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t[&quot;@@iterator&quot;]||i[r(t)]}},function(t,e){},function(t,e,n){n(108);for(var r=n(3),o=n(6),i=n(15),u=n(1)(&quot;toStringTag&quot;),s=[&quot;NodeList&quot;,&quot;DOMTokenList&quot;,&quot;MediaList&quot;,&quot;StyleSheetList&quot;,&quot;CSSRuleList&quot;],c=0;c&lt;5;c++){var a=s[c],f=r[a],l=f&amp;&amp;f.prototype;l&amp;&amp;!l[u]&amp;&amp;o(l,u,a),i[a]=i.Array}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var r=n(117);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return&quot;Symbol(&quot;.concat(void 0===t?&quot;&quot;:t,&quot;)_&quot;,(++n+r).toString(36))}},function(t,e,n){var r=n(133)(&quot;wks&quot;),o=n(63),i=n(18).Symbol,u=&quot;function&quot;==typeof i,s=t.exports=function(t){return r[t]||(r[t]=u&amp;&amp;i[t]||(u?i:o)(&quot;Symbol.&quot;+t))};s.store=r},function(t,e){&quot;use strict&quot;;Object.defineProperty(e,&quot;__esModule&quot;,{value:!0}),e[&quot;default&quot;]={props:[&quot;show&quot;,&quot;onClose&quot;],methods:{close:function(){this.onClose()}},ready:function(){var t=this;document.addEventListener(&quot;keydown&quot;,function(e){t.show&amp;&amp;27===e.keyCode&amp;&amp;t.onClose()})}}},function(t,e){&quot;use strict&quot;;Object.defineProperty(e,&quot;__esModule&quot;,{value:!0}),e[&quot;default&quot;]={data:function(){return{value:void 0,newValue:void 0,id:void 0,col:void 0,editable:!1,sortFunction:3,mode:&quot;readOnly&quot;}},props:{multiline:{type:Boolean,&quot;default&quot;:!1},lexicographicalOrdering:{type:Boolean,&quot;default&quot;:!1}},compiled:function(){this.lexicographicalOrdering===!0&amp;&amp;(this.sortFunction=&quot;lexicographic&quot;)},computed:{processedText:function(){function t(t){return String(t).replace(/[&amp;&lt;&gt;&quot;&#39;\/]/g,function(t){return e[t]})}var e={&quot;&amp;&quot;:&quot;&amp;amp;&quot;,&quot;&lt;&quot;:&quot;&amp;lt;&quot;,&quot;&gt;&quot;:&quot;&amp;gt;&quot;,&#39;&quot;&#39;:&quot;&amp;quot;&quot;,&quot;&#39;&quot;:&quot;&amp;#39;&quot;,&quot;/&quot;:&quot;&amp;#x2F;&quot;};return t(this.value).replace(/\n/g,&quot;&lt;br/&gt;&quot;)},classes:function(){var t=[];return this.editable&amp;&amp;&quot;readOnly&quot;===this.mode&amp;&amp;t.push(&quot;pointer-cursor full-height&quot;),&quot;edit&quot;!==this.mode&amp;&amp;&quot;saving&quot;!==this.mode||(t.push(&quot;ui input&quot;),t.push(&quot;padding&quot;),t.push(&quot;input-group&quot;)),t.join(&quot; &quot;)}},methods:{cancel:function(){this.$dispatch(&quot;cancel&quot;,{id:this.id,col:this.col})},save:function(){this.$dispatch(&quot;saveNewValue&quot;,{id:this.id,col:this.col})},edit:function(){var t=this;this.$dispatch(&quot;enterEditMode&quot;,{id:this.id,col:this.col}),this.$nextTick(function(){t.multiline?t.$el.querySelector(&quot;textarea&quot;).focus():t.$el.querySelector(&quot;input&quot;).focus()})}}}},function(t,e,n){&quot;use strict&quot;;function r(t){return t&amp;&amp;t.__esModule?t:{&quot;default&quot;:t}}Object.defineProperty(e,&quot;__esModule&quot;,{value:!0});var o=n(44),i=r(o),u=n(69),s=r(u),c=n(71),a=r(c),f=n(74),l=r(f),d=n(70),p=r(d),h=n(75),v=r(h),y=n(148),m=r(y),b=n(139),x=r(b),w=n(150),g=r(w),_=n(152),S=r(_);S[&quot;default&quot;].component(&quot;plain-text&quot;,g[&quot;default&quot;]),e[&quot;default&quot;]={components:{Modal:m[&quot;default&quot;]},data:function(){return{toggleAll:!1,action:void 0,selection:[],error:!1,backMatrix:{},newRowInput:{},scrolledPast:!1,filters:{},orderKey:void 0,reverseOrder:!1,additionalTdClasses:[],mandatory:[],customEditChildrenByCol:{},addRowCompiled:{}}},props:{tableClasses:{type:String,&quot;default&quot;:&quot;ui celled table&quot;},autoLoad:Boolean,autoRefresh:Boolean,canFilterBy:Array,header:{type:Array,&quot;default&quot;:function(){return[]}},orderBy:Array,idCol:{type:String,required:!1,&quot;default&quot;:&quot;_id&quot;},&quot;delete&quot;:{type:Boolean,&quot;default&quot;:!1},footer:{required:!1},bodyPath:{type:String,&quot;default&quot;:&quot;body&quot;},body:{type:Array,required:!1,&quot;default&quot;:void 0},actions:[Object,Array],endpoint:{type:String,&quot;default&quot;:&quot;http://localhost:8080&quot;},labelCol:{type:String,&quot;default&quot;:&quot;name&quot;},editable:{type:Array,&quot;default&quot;:function(){return[]}},addRow:{type:Boolean,&quot;default&quot;:!1}},computed:{placeholder:function(){return this.autoLoad?&quot;...&quot;:&quot;&amp;#9888&quot;},tableClassesProcessed:function(){return this.orderBy!=={}?&quot;sortable &quot;+this.tableClasses:this.tableClasses},processedFooter:function(){return void 0===this.footer?[]:this.footer.constructor===Array?this.footer.length&gt;0&amp;&amp;this.footer[0].constructor===Array?this.footer:[this.footer]:&quot;object&quot;===(0,v[&quot;default&quot;])(this.footer)?this.footer:void 0},mandatoryFields:function(){var t=this;return this.tableHeader.filter(function(e){return t.isMandatoryField(e.key)})},canSaveNewRow:function(){var t=this;return this.mandatoryFields.every(function(e){return t.validate(e,t.newRowInput[e])})&amp;&amp;this.addRow},editableFields:function(){var t=this;return this.tableHeader.filter(function(e){return t.isEditable(e.key)})},actionsArePresent:function(){return!!(Array.isArray(this.actions)&amp;&amp;this.actions.length&gt;0)||this.actions instanceof Object&amp;&amp;(0,p[&quot;default&quot;])(this.actions).length&gt;0},tableHeader:function(){if(!this.header.every(function(t){return&quot;string&quot;==typeof t||t instanceof String}))return this.header.some(function(t){return&quot;string&quot;==typeof t||t instanceof String})?void console.error(&quot;[Smart Table Error] Some elements of the header are strings while other are not, cannot have a mixed header&quot;):this.header;var t=this.body;void 0===this.body&amp;&amp;(t=[]);var e=[].concat((0,l[&quot;default&quot;])(new a[&quot;default&quot;]([].concat.apply([],t.map(function(t){return(0,p[&quot;default&quot;])(t)})))));e=e.filter(function(t){return!/^_/.test(t)});var n=[];n=this.header.length&lt;1?e:this.header,n.length!==e.length&amp;&amp;console.error(&quot;[Smart Table Error] The number of columns specified &quot;+n.length+&quot; does not match the number of columns in the body &quot;+e.length);var r=[];return n.forEach(function(t,o){r[o]={key:e[o],label:n[o]}}),r},mainCol:function(){var t=this;return void 0===this.tableHeader.find(function(e){return e.key===t.labelCol})?this.tableHeader[0].key:this.labelCol},smartBody:function(){var t=this;return this.processedSmartBody.map(function(e){var n=t.tableHeader.map(function(t){return t.key});return{_id:e._id,cols:n}})},processedSmartBody:function(){function t(t,e){return t.split(&quot;.&quot;).reduce(function(t,e){return t[e]},e)}var e=this;void 0===this.body&amp;&amp;(this.body=[]);var n=0;this.body.forEach(function(r){var o=t(e.idCol,r);void 0!==o&amp;&amp;null!==o||void 0!==r[e.idCol]&amp;&amp;null!==r[e.idCol]||(r[e.idCol]=&quot;smart_&quot;+n++)});var r=[];return this.body.forEach(function(n){var o={};e.tableHeader.forEach(function(e){var r={};/\+/.test(e.key)?e.key.split(&quot;+&quot;).forEach(function(e){r[e]=t(e,n)}):r=t(e.key,n),o[e.key]=r});var i=t(e.idCol,n),u=n[e.idCol];o._id=String(i||u),r.push(o)}),void 0!==this.orderKey&amp;&amp;(r=this.sortRows(r,this.orderKey,this.reverseOrder)),r},shouldShowId:function(){return void 0!==this.tableHeader.find(function(t){return&quot;_id&quot;===t.key})},span:function(){return this.tableHeader.length+1+(this[&quot;delete&quot;]?1:0)}},beforeCompile:function(){var t=this;if((void 0===this.body||this.body.length&lt;1)&amp;&amp;this.autoLoad===!1&amp;&amp;console.warn(&quot;Body passed is empty, if you want to load data set auto-load to true&quot;),Array.isArray(this.orderBy)){var e={};this.orderBy.forEach(function(t){e[t]={}}),this.orderBy=e}if(void 0===this.orderBy&amp;&amp;(this.orderBy={}),Array.isArray(this.actions)){var n={};this.actions.forEach(function(t){return n[t]=t}),this.actions=n}void 0===this.actions&amp;&amp;(this.actions={}),Array.isArray(this.canFilterBy)&amp;&amp;!function(){var e={};t.canFilterBy.forEach(function(t){return e[t]={open:!1,model:&quot;&quot;}}),t.filters=e}()},compiled:function(){this.autoLoad===!0?this.refresh():this.updateInjectedValues()},watch:{body:function(){this.updateInjectedValues()}},methods:{filterRows:function(t,e,n){return t.filter(function(t){return!0})},sortRows:function(t,e,n){function r(t,r){var o=t[e],i=r[e];return void 0===o||void 0===i?0:(o-i)*(n?-1:1)}function o(t,r){var o=t[e],i=r[e];if(void 0===o||void 0===i)return 0;var u=o&gt;i?1:-1;return u*(n?-1:1)}var i=this,u=this.$children.find(function(t){return t.col===e});if(void 0!==u.sortFunction&amp;&amp;&quot;function&quot;==typeof u.sortFunction)return t.sort(u.sortFunction),t;var s=!1;void 0!==u.sortFunction&amp;&amp;&quot;string&quot;==typeof u.sortFunction&amp;&amp;&quot;lexicographic&quot;===u.sortFunction&amp;&amp;(s=!0);var c=t.every(function(t){return!i.isNumeric(t[e])});return c|s?t.sort(o):t.sort(r),t},tdClasses:function(t,e){var n=&quot;&quot;;return this.isEditable(t)&amp;&amp;(n+=&quot;selectable &quot;),void 0===this.additionalTdClasses[t]&amp;&amp;(this.additionalTdClasses[t]=[]),void 0===this.additionalTdClasses[t][e]&amp;&amp;(this.additionalTdClasses[t][e]=[]),this.additionalTdClasses[t][e].forEach(function(t){return n+=&quot; &quot;+t}),n},refresh:function(){var t=this;this.$dispatch(&quot;before-request&quot;),this.$http.get(this.endpoint).then(function(e){var n=[];n=0===t.bodyPath.length?e.data:e.data[t.bodyPath],S[&quot;default&quot;].set(t,&quot;body&quot;,n),t.$set(&quot;footer&quot;,e.data.footer),t.$dispatch(&quot;successful-request&quot;),t.$dispatch(&quot;after-request&quot;),t.$set(&quot;error&quot;,!1),t.updateInjectedValues()},function(e){t.$set(&quot;error&quot;,{status:e.status,data:e.data.error}),t.$dispatch(&quot;failed-request&quot;),t.$dispatch(&quot;after-request&quot;)})},maybeRefresh:function(){this.autoRefresh&amp;&amp;this.refresh()},openFilter:function(t){this.filters[t].open=!0},saveNewRow:function(){var t=this;this.canSaveNewRow&amp;&amp;(this.$dispatch(&quot;before-request&quot;),this.$http.post(this.endpoint,{action:&quot;addRow&quot;,resource:this.newRowInput}).then(function(e){t.$set(&quot;error&quot;,!1),t.$set(&quot;body&quot;,e.data.body),t.$dispatch(&quot;successful-request&quot;),t.$dispatch(&quot;after-request&quot;),t.maybeRefresh()},function(e){t.$set(&quot;error&quot;,{status:e.status,data:e.data}),t.$dispatch(&quot;failed-request&quot;),t.$dispatch(&quot;after-request&quot;)}))},validate:function(t,e){return void 0!==e&amp;&amp;&quot;&quot;!==e},injectEditComponentForCol:function(t){var e=this,n=this,r=void 0,o=(0,x[&quot;default&quot;])(&quot;edit-new-&quot;+t);if(void 0===n.customEditChildrenByCol[t]){if(!n.isMandatoryField(t)&amp;&amp;!n.isEditable(t))return void(this.addRowCompiled[t]=!0);(0,p[&quot;default&quot;])(g[&quot;default&quot;].props).forEach(function(t){return g[&quot;default&quot;].props[t].coerce=void 0});var i=S[&quot;default&quot;].extend(g[&quot;default&quot;]);r=new i({el:n.$el.querySelector(&quot;#&quot;+o),parent:n})}else{var u=function(){if(r=n.customEditChildrenByCol[t],!n.isMandatoryField(t)&amp;&amp;!n.isEditable(t)&amp;&amp;void 0!==r)return r.$destroy(!0),n.customEditChildrenByCol[t]=void 0,e.addRowCompiled[t]=!0,{v:void 0};var i=r.$options.props;void 0!==r._props&amp;&amp;!function(){var t=(0,p[&quot;default&quot;])(r._props),e={};t.forEach(function(t){return e[t]=r[t]});var n=t.map(function(t){return function(){return r[t]}});(0,p[&quot;default&quot;])(i).forEach(function(t,e){return i[t].coerce=n[e]})}();var u={methods:{enterEditMode:function(){this.$dispatch(&quot;enterEditMode&quot;,{id:this.id,col:this.col})},saveNewValue:function(){this.$dispatch(&quot;saveNewValue&quot;,{id:this.id,col:this.col})},cancel:function(){this.$dispatch(&quot;cancel&quot;,{id:this.id,col:this.col})}}},c=(0,s[&quot;default&quot;])({},r.$options,{mixins:[u],el:function(){return n.$el.querySelector(&quot;#&quot;+o)},props:i}),a=S[&quot;default&quot;].extend(c);r.$destroy(),r=new a({parent:n})}();if(&quot;object&quot;===(&quot;undefined&quot;==typeof u?&quot;undefined&quot;:(0,v[&quot;default&quot;])(u)))return u.v}S[&quot;default&quot;].set(r,&quot;id&quot;,&quot;____add-row&quot;),S[&quot;default&quot;].set(r,&quot;col&quot;,t),S[&quot;default&quot;].set(r,&quot;mode&quot;,&quot;edit&quot;),S[&quot;default&quot;].set(r,&quot;mandatory&quot;,this.isMandatoryField(t)),this.addRowCompiled[t]=!0},updateInjectedValues:function(){function t(t){return function(e){return e._id===t}}var e=this,n=this,r={};n.$children.forEach(function(t){if(/^edit/.test(t.$el.parentElement.id)){var n=t.$el.parentElement.id.match(/^edit-(?:new|cell)-([a-zA-Z0-9.+]+)/)[1];void 0===e.customEditChildrenByCol[n]&amp;&amp;(e.customEditChildrenByCol[n]=t)}if(/^value/.test(t.$el.parentElement.id)){var o=t.$el.parentElement.id.match(/^value-([a-zA-Z0-9 ._-]+)-/)[1],i=t.$el.parentElement.id.match(/^value-[a-zA-Z0-9 ._-]+-([a-zA-Z0-9.+]+)$/)[1];void 0===r[i]&amp;&amp;(r[i]={}),r[i][o]=t}});var o={};n.tableHeader.map(function(t){return t.key}).forEach(function(e){var u=(0,x[&quot;default&quot;])(e);n.addRow!==!0||n.addRowCompiled[e]!==!1&amp;&amp;void 0!==n.addRowCompiled[e]||n.injectEditComponentForCol(e),void 0===o[e]&amp;&amp;(o[e]={},(0,i[&quot;default&quot;])(n.$el.querySelectorAll(&quot;.cell-&quot;+u)).forEach(function(t){var n=t.id.match(/^cell-([a-zA-Z0-9 ._-]+)-/)[1];o[e][n]=t})),(0,p[&quot;default&quot;])(o[e]).forEach(function(o){var i=void 0,u=n.processedSmartBody.find(t(o)),c=&quot;#&quot;+(0,x[&quot;default&quot;])(&quot;value-&quot;+o+&quot;-&quot;+e);if(void 0!==r[e]&amp;&amp;void 0!==r[e][o])!function(){i=r[e][o];var t=i.$options.props;void 0!==i._props&amp;&amp;!function(){var e=(0,p[&quot;default&quot;])(i._props),n={};e.forEach(function(t){return n[t]=i[t]});var r=e.map(function(t){return function(){return i[t]}});(0,p[&quot;default&quot;])(t).forEach(function(e,n){return t[e].coerce=r[n]})}();var u={methods:{enterEditMode:function(){this.$dispatch(&quot;enterEditMode&quot;,{id:this.id,col:this.col})},saveNewValue:function(){this.$dispatch(&quot;saveNewValue&quot;,{id:this.id,col:this.col})},cancel:function(){this.$dispatch(&quot;cancel&quot;,{id:this.id,col:this.col})}}},a=(0,s[&quot;default&quot;])({},i.$options,{mixins:[u],el:function(){return n.$el.querySelector(c)},props:t}),f=S[&quot;default&quot;].extend(a);i.$destroy(),i=new f({parent:n})}();else{(0,p[&quot;default&quot;])(g[&quot;default&quot;].props).forEach(function(t){return g[&quot;default&quot;].props[t].coerce=void 0});var a=S[&quot;default&quot;].extend(g[&quot;default&quot;]);if(i=new a({el:n.$el.querySelector(c),parent:n}),void 0===n.$el.querySelector(c))return void console.error(&#39;could not find element &quot;&#39;+c+&#39;&quot;&#39;)}return void 0===i?void console.error(&quot;no child component found for id &quot;+o.match(/^cell-([a-zA-Z0-9 ._-]+)-/)[1]):(S[&quot;default&quot;].set(i,&quot;id&quot;,o),S[&quot;default&quot;].set(i,&quot;col&quot;,e),S[&quot;default&quot;].set(i,&quot;mode&quot;,&quot;readOnly&quot;),S[&quot;default&quot;].set(i,&quot;value&quot;,u[e]),S[&quot;default&quot;].set(i,&quot;editable&quot;,n.isEditable(e)),void 0===n.additionalTdClasses[e]&amp;&amp;(n.additionalTdClasses[e]=[]),void(n.additionalTdClasses[e][o]=i.tdClasses||[]))})})},toggleAllRows:function(){this.toggleAll===!1?(this.toggleAll=!0,this.selection=this.processedSmartBody.map(function(t){return t._id})):(this.toggleAll=!1,this.selection=[])},next:function(){var t=this,e=this.action,n=this.actions[this.action],r=this.selection.map(function(e){var n=t.processedSmartBody.filter(function(t){return t._id===e})[0];if(void 0!==n){var r=n[t.mainCol];return{key:e,label:r}}return null}).filter(function(t){return null!==t}),o={action:{key:e,label:n},selection:r};this.$broadcast(&quot;command&quot;,o)},doCommand:function(t){this.$dispatch(&quot;before-request&quot;),/^(_remove|_delete)$/i.test(t.action)?this.$http[&quot;delete&quot;](this.endpoint,t).then(this.onSuccess,this.onFailure):this.$http.get(this.endpoint,t).then(this.onSuccess,this.onFailure)},remove:function(t){this.$dispatch(&quot;before-request&quot;),this.$http[&quot;delete&quot;](this.endpoint+&quot;/&quot;+t).then(this.onSuccess,this.onFailure)},isEditable:function(t){return this.editable.indexOf(t)!==-1},put:function(t){var e=this,n=arguments.length&lt;=1||void 0===arguments[1]||arguments[1];this.$dispatch(&quot;before-request&quot;);var r=this.$children.find(function(e){return e.id===t.id&amp;&amp;e.col===t.col});return void 0===r?void console.error(&quot;Children with id &quot;+t.id+&quot; was not found&quot;):(S[&quot;default&quot;].set(r,&quot;mode&quot;,&quot;saving&quot;),void(n&amp;&amp;this.$http.put(this.endpoint+&quot;/&quot;+t.id+&quot;/&quot;+t.col,{action:&quot;edit&quot;,value:t.value}).then(function(n){S[&quot;default&quot;].set(r,&quot;mode&quot;,&quot;readOnly&quot;),S[&quot;default&quot;].set(r,&quot;value&quot;,t.value),e.$dispatch(&quot;successful-request&quot;),e.$dispatch(&quot;after-request&quot;),e.$set(&quot;error&quot;,!1),e.maybeRefresh()},function(t){S[&quot;default&quot;].set(r,&quot;mode&quot;,&quot;readOnly&quot;),e.$set(&quot;error&quot;,{status:t.status,data:t.data.error}),e.$dispatch(&quot;failed-request&quot;),e.$dispatch(&quot;after-request&quot;)})))},post:function(t){arguments.length&lt;=1||void 0===arguments[1]||arguments[1];setTimeout(function(){},1e3)},isPlainObject:function(t){return null!==t&amp;&amp;&quot;object&quot;===(&quot;undefined&quot;==typeof t?&quot;undefined&quot;:(0,v[&quot;default&quot;])(t))},isMandatoryField:function(t){return this.mandatory[t]!==!1&amp;&amp;(this.mandatory[t]||this.isEditable(t))},doOrderBy:function(t){this.canOrderBy(t)&amp;&amp;(this.orderKey===t?this.reverseOrder=!this.reverseOrder:this.reverseOrder=!1,this.orderKey=t)},orderClass:function(t){return this.orderKey===t&amp;&amp;this.reverseOrder===!1?&quot;sorted ascending&quot;:this.orderKey===t&amp;&amp;this.reverseOrder===!0?&quot;sorted descending&quot;:&quot;&quot;},canOrderBy:function(t){return(0,p[&quot;default&quot;])(this.orderBy).indexOf(t)!==-1},isNumeric:function(t){return!(!+(&quot;1&quot;+t)&amp;&amp;!+(t+&quot;1&quot;))&amp;&amp;!Array.isArray(t)&amp;&amp;isFinite(t)&amp;&amp;&quot;&quot;!==t},onFailure:function(t){this.$set(&quot;error&quot;,{status:t.status,data:t.data.error}),this.$dispatch(&quot;failed-request&quot;),this.$dispatch(&quot;after-request&quot;)},onSuccess:function(t){var e=&quot;&quot;;e=0===this.bodyPath.length?t.data:t.data[this.bodyPath],void 0===e&amp;&amp;e!=={}||(this.$set(&quot;body&quot;,e),this.$set(&quot;footer&quot;,t.data.footer)),this.$dispatch(&quot;successful-request&quot;),this.$dispatch(&quot;after-request&quot;),this.$set(&quot;error&quot;,!1),this.maybeRefresh()}},events:{saveNewValue:function(t){var e=t.id,n=t.col,r=this.$children.find(function(t){return t.id===e&amp;&amp;t.col===n});&quot;____add-row&quot;===e?this.newRowInput[n]=r.newValue:&quot;edit&quot;===r.mode&amp;&amp;this.put({value:r.newValue,id:e,col:n})},enterEditMode:function(t){var e=t.id,n=t.col,r=this.$children.find(function(t){return t.id===e&amp;&amp;t.col===n});if(&quot;readOnly&quot;===r.mode){if(!r.editable)return void console.log(&quot;Clicked non-editable field &quot;+n+&quot;-&quot;+e+&quot;. Ignoring.&quot;);r.mode=&quot;edit&quot;,r.newValue=r.value}},cancel:function(t){var e=t.id,n=t.col;if(&quot;____add-row&quot;!==e){var r=this.$children.find(function(t){return t.id===e&amp;&amp;t.col===n});&quot;edit&quot;===r.mode&amp;&amp;setTimeout(function(){&quot;edit&quot;===r.mode&amp;&amp;(r.mode=&quot;readOnly&quot;,r.newValue=void 0)},120)}}}}},function(t,e,n){&quot;use strict&quot;;function r(t){return t&amp;&amp;t.__esModule?t:{&quot;default&quot;:t}}Object.defineProperty(e,&quot;__esModule&quot;,{value:!0});var o=n(149),i=r(o);e[&quot;default&quot;]={components:{ModalCore:i[&quot;default&quot;]},data:function(){return{problem:{},actionLabel:&quot;undefined&quot;,command:{action:void 0,selection:[]}}},props:[&quot;show&quot;],events:{command:function(t){this.show=!0,this.command.action=t.action.key,this.actionLabel=t.action.label,this.command.selection=t.selection,this.problem=!1,void 0===this.command.action?this.problem={&quot;short&quot;:&quot;No action to perform!&quot;,&quot;long&quot;:&quot;Please select an action from the dropdown menu.&quot;}:0===this.command.selection.length&amp;&amp;(this.problem={&quot;short&quot;:&quot;Selection empty!&quot;,&quot;long&quot;:&quot;There is no selection to &quot;+this.actionLabel+&quot;.&quot;})}},methods:{close:function(){this.show=!1},confirm:function(){this.$dispatch(&quot;confirm&quot;,this.command),this.close()}}}},function(t,e,n){t.exports={&quot;default&quot;:n(77),__esModule:!0}},function(t,e,n){t.exports={&quot;default&quot;:n(78),__esModule:!0}},function(t,e,n){t.exports={&quot;default&quot;:n(79),__esModule:!0}},function(t,e,n){t.exports={&quot;default&quot;:n(80),__esModule:!0}},function(t,e,n){t.exports={&quot;default&quot;:n(81),__esModule:!0}},function(t,e,n){&quot;use strict&quot;;function r(t){return t&amp;&amp;t.__esModule?t:{&quot;default&quot;:t}}e.__esModule=!0;var o=n(44),i=r(o);e[&quot;default&quot;]=function(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e&lt;t.length;e++)n[e]=t[e];return n}return(0,i[&quot;default&quot;])(t)}},function(t,e,n){&quot;use strict&quot;;function r(t){return t&amp;&amp;t.__esModule?t:{&quot;default&quot;:t}}e.__esModule=!0;var o=n(73),i=r(o),u=n(72),s=r(u),c=&quot;function&quot;==typeof s[&quot;default&quot;]&amp;&amp;&quot;symbol&quot;==typeof i[&quot;default&quot;]?function(t){return typeof t}:function(t){return t&amp;&amp;&quot;function&quot;==typeof s[&quot;default&quot;]&amp;&amp;t.constructor===s[&quot;default&quot;]?&quot;symbol&quot;:typeof t};e[&quot;default&quot;]=&quot;function&quot;==typeof s[&quot;default&quot;]&amp;&amp;&quot;symbol&quot;===c(i[&quot;default&quot;])?function(t){return&quot;undefined&quot;==typeof t?&quot;undefined&quot;:c(t)}:function(t){return t&amp;&amp;&quot;function&quot;==typeof s[&quot;default&quot;]&amp;&amp;t.constructor===s[&quot;default&quot;]?&quot;symbol&quot;:&quot;undefined&quot;==typeof t?&quot;undefined&quot;:c(t)}},function(t,e,n){n(40),n(107),t.exports=n(2).Array.from},function(t,e,n){n(109),t.exports=n(2).Object.assign},function(t,e,n){n(110),t.exports=n(2).Object.keys},function(t,e,n){n(58),n(40),n(59),n(111),n(113),t.exports=n(2).Set},function(t,e,n){n(112),n(58),n(114),n(115),t.exports=n(2).Symbol},function(t,e,n){n(40),n(59),t.exports=n(39).f(&quot;iterator&quot;)},function(t,e){t.exports=function(t){if(&quot;function&quot;!=typeof t)throw TypeError(t+&quot; is not a function!&quot;);return t}},function(t,e){t.exports=function(){}},function(t,e,n){var r=n(27);t.exports=function(t,e){var n=[];return r(t,!1,n.push,n,e),n}},function(t,e,n){var r=n(10),o=n(22),i=n(106);t.exports=function(t){return function(e,n,u){var s,c=r(e),a=o(c.length),f=i(u,a);if(t&amp;&amp;n!=n){for(;a&gt;f;)if(s=c[f++],s!=s)return!0}else for(;a&gt;f;f++)if((t||f in c)&amp;&amp;c[f]===n)return t||f||0;return!t&amp;&amp;-1}}},function(t,e,n){var r=n(14),o=n(28),i=n(17),u=n(22),s=n(88);t.exports=function(t,e){var n=1==t,c=2==t,a=3==t,f=4==t,l=6==t,d=5==t||l,p=e||s;return function(e,s,h){for(var v,y,m=i(e),b=o(m),x=r(s,h,3),w=u(b.length),g=0,_=n?p(e,w):c?p(e,0):void 0;w&gt;g;g++)if((d||g in b)&amp;&amp;(v=b[g],y=x(v,g,m),t))if(n)_[g]=y;else if(y)switch(t){case 3:return!0;case 5:return v;case 6:return g;case 2:_.push(v)}else if(f)return!1;return l?-1:a||f?f:_}}},function(t,e,n){var r=n(12),o=n(50),i=n(1)(&quot;species&quot;);t.exports=function(t){var e;return o(t)&amp;&amp;(e=t.constructor,&quot;function&quot;!=typeof e||e!==Array&amp;&amp;!o(e.prototype)||(e=void 0),r(e)&amp;&amp;(e=e[i],null===e&amp;&amp;(e=void 0))),void 0===e?Array:e}},function(t,e,n){var r=n(87);t.exports=function(t,e){return new(r(t))(e)}},function(t,e,n){&quot;use strict&quot;;var r=n(4).f,o=n(32),i=(n(6),n(55)),u=n(14),s=n(45),c=n(19),a=n(27),f=n(29),l=n(52),d=n(104),p=n(5),h=n(31).fastKey,v=p?&quot;_s&quot;:&quot;size&quot;,y=function(t,e){var n,r=h(e);if(&quot;F&quot;!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,f){var l=t(function(t,r){s(t,l,e,&quot;_i&quot;),t._i=o(null),t._f=void 0,t._l=void 0,t[v]=0,void 0!=r&amp;&amp;a(r,n,t[f],t)});return i(l.prototype,{clear:function(){for(var t=this,e=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&amp;&amp;(n.p=n.p.n=void 0),delete e[n.i];t._f=t._l=void 0,t[v]=0},&quot;delete&quot;:function(t){var e=this,n=y(e,t);if(n){var r=n.n,o=n.p;delete e._i[n.i],n.r=!0,o&amp;&amp;(o.n=r),r&amp;&amp;(r.p=o),e._f==n&amp;&amp;(e._f=r),e._l==n&amp;&amp;(e._l=o),e[v]--}return!!n},forEach:function(t){s(this,l,&quot;forEach&quot;);for(var e,n=u(t,arguments.length&gt;1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(n(e.v,e.k,this);e&amp;&amp;e.r;)e=e.p},has:function(t){return!!y(this,t)}}),p&amp;&amp;r(l.prototype,&quot;size&quot;,{get:function(){return c(this[v])}}),l},def:function(t,e,n){var r,o,i=y(t,e);return i?i.v=n:(t._l=i={i:o=h(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=i),r&amp;&amp;(r.n=i),t[v]++,&quot;F&quot;!==o&amp;&amp;(t._i[o]=i)),t},getEntry:y,setStrong:function(t,e,n){f(t,e,function(t,e){this._t=t,this._k=e,this._l=void 0},function(){for(var t=this,e=t._k,n=t._l;n&amp;&amp;n.r;)n=n.p;return t._t&amp;&amp;(t._l=n=n?n.n:t._t._f)?&quot;keys&quot;==e?l(0,n.k):&quot;values&quot;==e?l(0,n.v):l(0,[n.k,n.v]):(t._t=void 0,</td>
      </tr>
      <tr>
        <td id="L2" class="blob-num js-line-number" data-line-number="2"></td>
        <td id="LC2" class="blob-code blob-code-inner js-file-line">l(1))},n?&quot;entries&quot;:&quot;values&quot;,!n,!0),d(e)}}},function(t,e,n){var r=n(46),o=n(84);t.exports=function(t){return function(){if(r(this)!=t)throw TypeError(t+&quot;#toJSON isn&#39;t generic&quot;);return o(this)}}},function(t,e,n){&quot;use strict&quot;;var r=n(3),o=n(7),i=n(31),u=n(8),s=n(6),c=n(55),a=n(27),f=n(45),l=n(12),d=n(21),p=n(4).f,h=n(86)(0),v=n(5);t.exports=function(t,e,n,y,m,b){var x=r[t],w=x,g=m?&quot;set&quot;:&quot;add&quot;,_=w&amp;&amp;w.prototype,S={};return v&amp;&amp;&quot;function&quot;==typeof w&amp;&amp;(b||_.forEach&amp;&amp;!u(function(){(new w).entries().next()}))?(w=e(function(e,n){f(e,w,t,&quot;_c&quot;),e._c=new x,void 0!=n&amp;&amp;a(n,m,e[g],e)}),h(&quot;add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON&quot;.split(&quot;,&quot;),function(t){var e=&quot;add&quot;==t||&quot;set&quot;==t;t in _&amp;&amp;(!b||&quot;clear&quot;!=t)&amp;&amp;s(w.prototype,t,function(n,r){if(f(this,w,t),!e&amp;&amp;b&amp;&amp;!l(n))return&quot;get&quot;==t&amp;&amp;void 0;var o=this._c[t](0===n?0:n,r);return e?this:o})}),&quot;size&quot;in _&amp;&amp;p(w.prototype,&quot;size&quot;,{get:function(){return this._c.size}})):(w=y.getConstructor(e,t,m,g),c(w.prototype,n),i.NEED=!0),d(w,t),S[t]=w,o(o.G+o.W+o.F,S),b||y.setStrong(w,t,m),w}},function(t,e,n){&quot;use strict&quot;;var r=n(4),o=n(16);t.exports=function(t,e,n){e in t?r.f(t,e,o(0,n)):t[e]=n}},function(t,e,n){var r=n(13),o=n(33),i=n(20);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var u,s=n(t),c=i.f,a=0;s.length&gt;a;)c.call(t,u=s[a++])&amp;&amp;e.push(u);return e}},function(t,e,n){t.exports=n(3).document&amp;&amp;document.documentElement},function(t,e,n){&quot;use strict&quot;;var r=n(32),o=n(16),i=n(21),u={};n(6)(u,n(1)(&quot;iterator&quot;),function(){return this}),t.exports=function(t,e,n){t.prototype=r(u,{next:o(1,n)}),i(t,e+&quot; Iterator&quot;)}},function(t,e,n){var r=n(1)(&quot;iterator&quot;),o=!1;try{var i=[7][r]();i[&quot;return&quot;]=function(){o=!0},Array.from(i,function(){throw 2})}catch(u){}t.exports=function(t,e){if(!e&amp;&amp;!o)return!1;var n=!1;try{var i=[7],u=i[r]();u.next=function(){return{done:n=!0}},i[r]=function(){return u},t(i)}catch(s){}return n}},function(t,e,n){var r=n(13),o=n(10);t.exports=function(t,e){for(var n,i=o(t),u=r(i),s=u.length,c=0;s&gt;c;)if(i[n=u[c++]]===e)return n}},function(t,e,n){&quot;use strict&quot;;var r=n(13),o=n(33),i=n(20),u=n(17),s=n(28),c=Object.assign;t.exports=!c||n(8)(function(){var t={},e={},n=Symbol(),r=&quot;abcdefghijklmnopqrst&quot;;return t[n]=7,r.split(&quot;&quot;).forEach(function(t){e[t]=t}),7!=c({},t)[n]||Object.keys(c({},e)).join(&quot;&quot;)!=r})?function(t,e){for(var n=u(t),c=arguments.length,a=1,f=o.f,l=i.f;c&gt;a;)for(var d,p=s(arguments[a++]),h=f?r(p).concat(f(p)):r(p),v=h.length,y=0;v&gt;y;)l.call(p,d=h[y++])&amp;&amp;(n[d]=p[d]);return n}:c},function(t,e,n){var r=n(4),o=n(11),i=n(13);t.exports=n(5)?Object.defineProperties:function(t,e){o(t);for(var n,u=i(e),s=u.length,c=0;s&gt;c;)r.f(t,n=u[c++],e[n]);return t}},function(t,e,n){var r=n(20),o=n(16),i=n(10),u=n(37),s=n(9),c=n(48),a=Object.getOwnPropertyDescriptor;e.f=n(5)?a:function(t,e){if(t=i(t),e=u(e,!0),c)try{return a(t,e)}catch(n){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){var r=n(10),o=n(53).f,i={}.toString,u=&quot;object&quot;==typeof window&amp;&amp;window&amp;&amp;Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(t){try{return o(t)}catch(e){return u.slice()}};t.exports.f=function(t){return u&amp;&amp;&quot;[object Window]&quot;==i.call(t)?s(t):o(r(t))}},function(t,e,n){var r=n(9),o=n(17),i=n(34)(&quot;IE_PROTO&quot;),u=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:&quot;function&quot;==typeof t.constructor&amp;&amp;t instanceof t.constructor?t.constructor.prototype:t instanceof Object?u:null}},function(t,e,n){var r=n(7),o=n(2),i=n(8);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],u={};u[t]=e(n),r(r.S+r.F*i(function(){n(1)}),&quot;Object&quot;,u)}},function(t,e,n){&quot;use strict&quot;;var r=n(3),o=n(2),i=n(4),u=n(5),s=n(1)(&quot;species&quot;);t.exports=function(t){var e=&quot;function&quot;==typeof o[t]?o[t]:r[t];u&amp;&amp;e&amp;&amp;!e[s]&amp;&amp;i.f(e,s,{configurable:!0,get:function(){return this}})}},function(t,e,n){var r=n(36),o=n(19);t.exports=function(t){return function(e,n){var i,u,s=String(o(e)),c=r(n),a=s.length;return c&lt;0||c&gt;=a?t?&quot;&quot;:void 0:(i=s.charCodeAt(c),i&lt;55296||i&gt;56319||c+1===a||(u=s.charCodeAt(c+1))&lt;56320||u&gt;57343?t?s.charAt(c):i:t?s.slice(c,c+2):(i-55296&lt;&lt;10)+(u-56320)+65536)}}},function(t,e,n){var r=n(36),o=Math.max,i=Math.min;t.exports=function(t,e){return t=r(t),t&lt;0?o(t+e,0):i(t,e)}},function(t,e,n){&quot;use strict&quot;;var r=n(14),o=n(7),i=n(17),u=n(51),s=n(49),c=n(22),a=n(92),f=n(57);o(o.S+o.F*!n(96)(function(t){Array.from(t)}),&quot;Array&quot;,{from:function(t){var e,n,o,l,d=i(t),p=&quot;function&quot;==typeof this?this:Array,h=arguments.length,v=h&gt;1?arguments[1]:void 0,y=void 0!==v,m=0,b=f(d);if(y&amp;&amp;(v=r(v,h&gt;2?arguments[2]:void 0,2)),void 0==b||p==Array&amp;&amp;s(b))for(e=c(d.length),n=new p(e);e&gt;m;m++)a(n,m,y?v(d[m],m):d[m]);else for(l=b.call(d),n=new p;!(o=l.next()).done;m++)a(n,m,y?u(l,v,[o.value,m],!0):o.value);return n.length=m,n}})},function(t,e,n){&quot;use strict&quot;;var r=n(83),o=n(52),i=n(15),u=n(10);t.exports=n(29)(Array,&quot;Array&quot;,function(t,e){this._t=u(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n&gt;=t.length?(this._t=void 0,o(1)):&quot;keys&quot;==e?o(0,n):&quot;values&quot;==e?o(0,t[n]):o(0,[n,t[n]])},&quot;values&quot;),i.Arguments=i.Array,r(&quot;keys&quot;),r(&quot;values&quot;),r(&quot;entries&quot;)},function(t,e,n){var r=n(7);r(r.S+r.F,&quot;Object&quot;,{assign:n(98)})},function(t,e,n){var r=n(17),o=n(13);n(103)(&quot;keys&quot;,function(){return function(t){return o(r(t))}})},function(t,e,n){&quot;use strict&quot;;var r=n(89);t.exports=n(91)(&quot;Set&quot;,function(t){return function(){return t(this,arguments.length&gt;0?arguments[0]:void 0)}},{add:function(t){return r.def(this,t=0===t?0:t,t)}},r)},function(t,e,n){&quot;use strict&quot;;var r=n(3),o=n(9),i=n(5),u=n(7),s=n(56),c=n(31).KEY,a=n(8),f=n(35),l=n(21),d=n(23),p=n(1),h=n(39),v=n(38),y=n(97),m=n(93),b=n(50),x=n(11),w=n(10),g=n(37),_=n(16),S=n(32),O=n(101),E=n(100),k=n(4),C=n(13),A=E.f,j=k.f,$=O.f,F=r.Symbol,M=r.JSON,P=M&amp;&amp;M.stringify,R=&quot;prototype&quot;,T=p(&quot;_hidden&quot;),B=p(&quot;toPrimitive&quot;),q={}.propertyIsEnumerable,N=f(&quot;symbol-registry&quot;),I=f(&quot;symbols&quot;),V=f(&quot;op-symbols&quot;),L=Object[R],z=&quot;function&quot;==typeof F,H=r.QObject,K=!H||!H[R]||!H[R].findChild,W=i&amp;&amp;a(function(){return 7!=S(j({},&quot;a&quot;,{get:function(){return j(this,&quot;a&quot;,{value:7}).a}})).a})?function(t,e,n){var r=A(L,e);r&amp;&amp;delete L[e],j(t,e,n),r&amp;&amp;t!==L&amp;&amp;j(L,e,r)}:j,D=function(t){var e=I[t]=S(F[R]);return e._k=t,e},J=z&amp;&amp;&quot;symbol&quot;==typeof F.iterator?function(t){return&quot;symbol&quot;==typeof t}:function(t){return t instanceof F},G=function(t,e,n){return t===L&amp;&amp;G(V,e,n),x(t),e=g(e,!0),x(n),o(I,e)?(n.enumerable?(o(t,T)&amp;&amp;t[T][e]&amp;&amp;(t[T][e]=!1),n=S(n,{enumerable:_(0,!1)})):(o(t,T)||j(t,T,_(1,{})),t[T][e]=!0),W(t,e,n)):j(t,e,n)},Z=function(t,e){x(t);for(var n,r=m(e=w(e)),o=0,i=r.length;i&gt;o;)G(t,n=r[o++],e[n]);return t},U=function(t,e){return void 0===e?S(t):Z(S(t),e)},Y=function(t){var e=q.call(this,t=g(t,!0));return!(this===L&amp;&amp;o(I,t)&amp;&amp;!o(V,t))&amp;&amp;(!(e||!o(this,t)||!o(I,t)||o(this,T)&amp;&amp;this[T][t])||e)},Q=function(t,e){if(t=w(t),e=g(e,!0),t!==L||!o(I,e)||o(V,e)){var n=A(t,e);return!n||!o(I,e)||o(t,T)&amp;&amp;t[T][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=$(w(t)),r=[],i=0;n.length&gt;i;)o(I,e=n[i++])||e==T||e==c||r.push(e);return r},tt=function(t){for(var e,n=t===L,r=$(n?V:w(t)),i=[],u=0;r.length&gt;u;)!o(I,e=r[u++])||n&amp;&amp;!o(L,e)||i.push(I[e]);return i};z||(F=function(){if(this instanceof F)throw TypeError(&quot;Symbol is not a constructor!&quot;);var t=d(arguments.length&gt;0?arguments[0]:void 0),e=function(n){this===L&amp;&amp;e.call(V,n),o(this,T)&amp;&amp;o(this[T],t)&amp;&amp;(this[T][t]=!1),W(this,t,_(1,n))};return i&amp;&amp;K&amp;&amp;W(L,t,{configurable:!0,set:e}),D(t)},s(F[R],&quot;toString&quot;,function(){return this._k}),E.f=Q,k.f=G,n(53).f=O.f=X,n(20).f=Y,n(33).f=tt,i&amp;&amp;!n(30)&amp;&amp;s(L,&quot;propertyIsEnumerable&quot;,Y,!0),h.f=function(t){return D(p(t))}),u(u.G+u.W+u.F*!z,{Symbol:F});for(var et=&quot;hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables&quot;.split(&quot;,&quot;),nt=0;et.length&gt;nt;)p(et[nt++]);for(var et=C(p.store),nt=0;et.length&gt;nt;)v(et[nt++]);u(u.S+u.F*!z,&quot;Symbol&quot;,{&quot;for&quot;:function(t){return o(N,t+=&quot;&quot;)?N[t]:N[t]=F(t)},keyFor:function(t){if(J(t))return y(N,t);throw TypeError(t+&quot; is not a symbol!&quot;)},useSetter:function(){K=!0},useSimple:function(){K=!1}}),u(u.S+u.F*!z,&quot;Object&quot;,{create:U,defineProperty:G,defineProperties:Z,getOwnPropertyDescriptor:Q,getOwnPropertyNames:X,getOwnPropertySymbols:tt}),M&amp;&amp;u(u.S+u.F*(!z||a(function(){var t=F();return&quot;[null]&quot;!=P([t])||&quot;{}&quot;!=P({a:t})||&quot;{}&quot;!=P(Object(t))})),&quot;JSON&quot;,{stringify:function(t){if(void 0!==t&amp;&amp;!J(t)){for(var e,n,r=[t],o=1;arguments.length&gt;o;)r.push(arguments[o++]);return e=r[1],&quot;function&quot;==typeof e&amp;&amp;(n=e),!n&amp;&amp;b(e)||(e=function(t,e){if(n&amp;&amp;(e=n.call(this,t,e)),!J(e))return e}),r[1]=e,P.apply(M,r)}}}),F[R][B]||n(6)(F[R],B,F[R].valueOf),l(F,&quot;Symbol&quot;),l(Math,&quot;Math&quot;,!0),l(r.JSON,&quot;JSON&quot;,!0)},function(t,e,n){var r=n(7);r(r.P+r.R,&quot;Set&quot;,{toJSON:n(90)(&quot;Set&quot;)})},function(t,e,n){n(38)(&quot;asyncIterator&quot;)},function(t,e,n){n(38)(&quot;observable&quot;)},function(t,e,n){n(138),t.exports=n(41).Array.find},function(t,e){t.exports=function(t){if(&quot;function&quot;!=typeof t)throw TypeError(t+&quot; is not a function!&quot;);return t}},function(t,e,n){var r=n(64)(&quot;unscopables&quot;),o=Array.prototype;void 0==o[r]&amp;&amp;n(43)(o,r,{}),t.exports=function(t){o[r][t]=!0}},function(t,e,n){var r=n(24);t.exports=function(t){if(!r(t))throw TypeError(t+&quot; is not an object!&quot;);return t}},function(t,e,n){var r=n(61),o=n(128),i=n(136),u=n(135),s=n(122);t.exports=function(t,e){var n=1==t,c=2==t,a=3==t,f=4==t,l=6==t,d=5==t||l,p=e||s;return function(e,s,h){for(var v,y,m=i(e),b=o(m),x=r(s,h,3),w=u(b.length),g=0,_=n?p(e,w):c?p(e,0):void 0;w&gt;g;g++)if((d||g in b)&amp;&amp;(v=b[g],y=x(v,g,m),t))if(n)_[g]=y;else if(y)switch(t){case 3:return!0;case 5:return v;case 6:return g;case 2:_.push(v)}else if(f)return!1;return l?-1:a||f?f:_}}},function(t,e,n){var r=n(24),o=n(129),i=n(64)(&quot;species&quot;);t.exports=function(t){var e;return o(t)&amp;&amp;(e=t.constructor,&quot;function&quot;!=typeof e||e!==Array&amp;&amp;!o(e.prototype)||(e=void 0),r(e)&amp;&amp;(e=e[i],null===e&amp;&amp;(e=void 0))),void 0===e?Array:e}},function(t,e,n){var r=n(121);t.exports=function(t,e){return new(r(t))(e)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError(&quot;Can&#39;t call method on  &quot;+t);return t}},function(t,e,n){var r=n(24),o=n(18).document,i=r(o)&amp;&amp;r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(18),o=n(41),i=n(43),u=n(132),s=n(61),c=&quot;prototype&quot;,a=function(t,e,n){var f,l,d,p,h=t&amp;a.F,v=t&amp;a.G,y=t&amp;a.S,m=t&amp;a.P,b=t&amp;a.B,x=v?r:y?r[e]||(r[e]={}):(r[e]||{})[c],w=v?o:o[e]||(o[e]={}),g=w[c]||(w[c]={});v&amp;&amp;(n=e);for(f in n)l=!h&amp;&amp;x&amp;&amp;void 0!==x[f],d=(l?x:n)[f],p=b&amp;&amp;l?s(d,r):m&amp;&amp;&quot;function&quot;==typeof d?s(Function.call,d):d,x&amp;&amp;u(x,f,d,t&amp;a.U),w[f]!=d&amp;&amp;i(w,f,p),m&amp;&amp;g[f]!=d&amp;&amp;(g[f]=d)};r.core=o,a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){t.exports=!n(42)&amp;&amp;!n(62)(function(){return 7!=Object.defineProperty(n(124)(&quot;div&quot;),&quot;a&quot;,{get:function(){return 7}}).a})},function(t,e,n){var r=n(60);t.exports=Object(&quot;z&quot;).propertyIsEnumerable(0)?Object:function(t){return&quot;String&quot;==r(t)?t.split(&quot;&quot;):Object(t)}},function(t,e,n){var r=n(60);t.exports=Array.isArray||function(t){return&quot;Array&quot;==r(t)}},function(t,e,n){var r=n(119),o=n(127),i=n(137),u=Object.defineProperty;e.f=n(42)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return u(t,e,n)}catch(s){}if(&quot;get&quot;in n||&quot;set&quot;in n)throw TypeError(&quot;Accessors not supported!&quot;);return&quot;value&quot;in n&amp;&amp;(t[e]=n.value),t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&amp;t),configurable:!(2&amp;t),writable:!(4&amp;t),value:e}}},function(t,e,n){var r=n(18),o=n(43),i=n(126),u=n(63)(&quot;src&quot;),s=&quot;toString&quot;,c=Function[s],a=(&quot;&quot;+c).split(s);n(41).inspectSource=function(t){return c.call(t)},(t.exports=function(t,e,n,s){var c=&quot;function&quot;==typeof n;c&amp;&amp;(i(n,&quot;name&quot;)||o(n,&quot;name&quot;,e)),t[e]!==n&amp;&amp;(c&amp;&amp;(i(n,u)||o(n,u,t[e]?&quot;&quot;+t[e]:a.join(String(e)))),t===r?t[e]=n:s?t[e]?t[e]=n:o(t,e,n):(delete t[e],o(t,e,n)))})(Function.prototype,s,function(){return&quot;function&quot;==typeof this&amp;&amp;this[u]||c.call(this)})},function(t,e,n){var r=n(18),o=&quot;__core-js_shared__&quot;,i=r[o]||(r[o]={});t.exports=function(t){return i[t]||(i[t]={})}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t&gt;0?r:n)(t)}},function(t,e,n){var r=n(134),o=Math.min;t.exports=function(t){return t&gt;0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(123);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(24);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&amp;&amp;&quot;function&quot;==typeof(n=t.toString)&amp;&amp;!r(o=n.call(t)))return o;if(&quot;function&quot;==typeof(n=t.valueOf)&amp;&amp;!r(o=n.call(t)))return o;if(!e&amp;&amp;&quot;function&quot;==typeof(n=t.toString)&amp;&amp;!r(o=n.call(t)))return o;throw TypeError(&quot;Can&#39;t convert object to primitive value&quot;)}},function(t,e,n){&quot;use strict&quot;;var r=n(125),o=n(120)(5),i=&quot;find&quot;,u=!0;i in[]&amp;&amp;Array(1)[i](function(){u=!1}),r(r.P+r.F*u,&quot;Array&quot;,{find:function(t){return o(this,t,arguments.length&gt;1?arguments[1]:void 0)}}),n(118)(i)},function(t,e,n){(function(e){!function(e,n){t.exports=n(e)}(&quot;undefined&quot;!=typeof e?e:this,function(t){if(t.CSS&amp;&amp;t.CSS.escape)return t.CSS.escape;var e=function(t){for(var e,n=String(t),r=n.length,o=-1,i=&quot;&quot;,u=n.charCodeAt(0);++o&lt;r;)e=n.charCodeAt(o),i+=0!=e?e&gt;=1&amp;&amp;e&lt;=31||127==e||0==o&amp;&amp;e&gt;=48&amp;&amp;e&lt;=57||1==o&amp;&amp;e&gt;=48&amp;&amp;e&lt;=57&amp;&amp;45==u?&quot;\\&quot;+e.toString(16)+&quot; &quot;:(0!=o||1!=r||45!=e)&amp;&amp;(e&gt;=128||45==e||95==e||e&gt;=48&amp;&amp;e&lt;=57||e&gt;=65&amp;&amp;e&lt;=90||e&gt;=97&amp;&amp;e&lt;=122)?n.charAt(o):&quot;\\&quot;+n.charAt(o):&quot;�&quot;;return i};return t.CSS||(t.CSS={}),t.CSS.escape=e,e})}).call(e,function(){return this}())},function(t,e){},function(t,e){},function(t,e){},function(t,e){},function(t,e){t.exports=&#39; &lt;div class=modal&gt; &lt;modal-core :show.sync=show :on-close=close&gt; &lt;div class=modal-header&gt; &lt;h3 v-show=problem&gt;{{problem.short}}&lt;/h3&gt; &lt;h3 v-else&gt;Are you sure?&lt;/h3&gt; &lt;/div&gt; &lt;div class=&quot;modal-body no-action&quot; v-show=problem&gt; &lt;p&gt;{{{problem.long}}}&lt;/p&gt; &lt;/div&gt; &lt;div class=modal-body v-else&gt; &lt;p&gt;You will &lt;span class=action-label&gt;{{actionLabel}}&lt;/span&gt; the following&lt;/p&gt; &lt;ul&gt; &lt;li v-for=&quot;item in command.selection&quot;&gt;{{item.label}}&lt;/li&gt; &lt;/ul&gt; &lt;/div&gt; &lt;div class=&quot;modal-footer text-right&quot; v-show=problem&gt; &lt;button class=modal-cancel-button @click=close&gt;Ok&lt;/button&gt; &lt;/div&gt; &lt;div class=&quot;modal-footer text-right&quot; v-else&gt; &lt;button class=modal-cancel-button @click=close&gt;Cancel&lt;/button&gt; &lt;button class=&quot;modal-default-button action-label&quot; @click=confirm(command)&gt; {{actionLabel}} &lt;/button&gt; &lt;/div&gt; &lt;/modal-core&gt; &lt;/div&gt; &#39;},function(t,e){t.exports=&quot; &lt;div class=modal-core @click=close v-show=show transition=modal&gt; &lt;div class=modal-container @click.stop&gt; &lt;slot&gt;&lt;/slot&gt; &lt;/div&gt; &lt;/div&gt; &quot;},function(t,e){t.exports=&#39; &lt;div class=&quot;smart-table table-responsive&quot;&gt; &lt;modal @confirm=doCommand&gt;&lt;/modal&gt; &lt;table :class=tableClassesProcessed&gt; &lt;thead&gt; &lt;tr&gt; &lt;th v-if=actionsArePresent&gt; &lt;input class=toggle-all type=checkbox @click=toggleAllRows /&gt; &lt;/th&gt; &lt;th v-for=&quot;column in tableHeader&quot; class=&quot;col-{{column.key}} col-cell {{canOrderBy(column.key) ? \&#39;ord\&#39; : \&#39;\&#39;}} {{orderClass(column.key)}}&quot; @click=doOrderBy(column.key)&gt; {{column.label || column.key}} &lt;div v-if=filters[column.key] class=&quot;{{column.key}}-filter-cue click-cue fa fa-filter&quot; @click=openFilter(column.key)&gt;&lt;/div&gt; &lt;div v-if=&quot;filters[column.key] &amp;&amp; filters[column.key].open&quot; class={{column.key}}-filter-input&gt; &lt;input type=text v-model=filters[column.key].model /&gt; &lt;/div&gt; &lt;/th&gt; &lt;th v-if=delete&gt; &lt;/th&gt; &lt;/tr&gt; &lt;/thead&gt; &lt;tfoot&gt; &lt;tr v-for=&quot;footerRow in processedFooter&quot; class=footer-row&gt; &lt;td v-if=actionsArePresent&gt;&lt;/td&gt; &lt;td v-for=&quot;footerCell in footerRow&quot; track-by=$index&gt; {{footerCell}} &lt;/td&gt; &lt;td v-if=delete&gt;&lt;/td&gt; &lt;/tr&gt; &lt;tr v-if=actionsArePresent class=action-row&gt; &lt;td class=smart-control-bar colspan={{span}}&gt; &lt;span class=bottom-right-corner&gt;&amp;#8990;&lt;/span&gt; &lt;select class=actions v-model=action&gt; &lt;option v-for=&quot;(key, label) in actions&quot; value={{key}} class=action-label&gt;{{label}}&lt;/option&gt; &lt;/select&gt; &lt;button class=action-button @click=next&gt;Next...&lt;/button&gt; &lt;/td&gt; &lt;/tr&gt; &lt;/tfoot&gt; &lt;tbody&gt; &lt;tr v-for=&quot;row in smartBody&quot; class=row-{{row._id}} track-by=_id&gt; &lt;td v-if=actionsArePresent&gt; &lt;input id=toggle-{{row._id}} value={{row._id}} type=checkbox v-model=selection /&gt; &lt;/td&gt; &lt;td v-for=&quot;col in row.cols&quot; id=cell-{{row._id}}-{{col}} :class=&quot;tdClasses(col, row._id) + \&#39; cell-\&#39; + col&quot;&gt; &lt;div id=value-{{row._id}}-{{col}}&gt; &lt;slot :name=col&gt; {{placeholder}} &lt;/slot&gt; &lt;/div&gt; &lt;/td&gt; &lt;td v-if=delete&gt; &lt;button id=delete-{{row._id}} @click=remove(row._id)&gt;Delete&lt;/button&gt; &lt;/td&gt; &lt;/tr&gt; &lt;tr v-if=addRow class=row-new&gt; &lt;td v-if=actionsArePresent&gt;&lt;/td&gt; &lt;td v-for=&quot;col in tableHeader&quot; id=edit-cell-{{col.key}} :class=&quot;tdClasses(col.key, \&#39;__edit\&#39;) + \&#39; edit-cell\&#39;&quot;&gt; &lt;div id=edit-new-{{col.key}} class=add-row&gt; &lt;slot :name=col.key&gt; &lt;/slot&gt; &lt;/div&gt; &lt;/td&gt; &lt;td v-if=delete&gt;&lt;/td&gt; &lt;/tr&gt; &lt;/tbody&gt; &lt;/table&gt; &lt;div class=add-row-button v-show=canSaveNewRow&gt;&lt;button class=&quot;ui button&quot; @click=saveNewRow&gt;Add Row&lt;/button&gt;&lt;/div&gt; &lt;div class=error-panel v-show=error&gt;{{error | json}}&lt;/div&gt; &lt;/div&gt; &#39;},function(t,e){t.exports=&#39; &lt;div :class=classes @click=edit _v-22804018=&quot;&quot;&gt; &lt;input v-show=&quot;(mode === \&#39;edit\&#39; || mode === \&#39;saving\&#39;) &amp;amp;&amp;amp; multiline === false&quot; type=text v-model=newValue @blur=save @keyup.13=save @keyup.27=cancel :disabled=&quot;mode === \&#39;saving\&#39;&quot; _v-22804018=&quot;&quot;&gt; &lt;textarea v-show=&quot;(mode === \&#39;edit\&#39; || mode === \&#39;saving\&#39;) &amp;amp;&amp;amp; multiline === true&quot; v-model=newValue @keyup.27=cancel :disabled=&quot;mode === \&#39;saving\&#39;&quot; _v-22804018=&quot;&quot;&gt;&lt;/textarea&gt; &lt;button v-show=&quot;(mode === \&#39;edit\&#39; || mode == \&#39;saving\&#39;) &amp;amp;&amp;amp; multiline === true &amp;amp;&amp;amp; id !== \&#39;____add-row\&#39;&quot; @click=save :disabled=&quot;mode === \&#39;saving\&#39;&quot; class=&quot;ui icon button btn&quot; _v-22804018=&quot;&quot;&gt;✓&lt;/button&gt; &lt;button v-show=&quot;(mode === \&#39;edit\&#39; || mode == \&#39;saving\&#39;) &amp;amp;&amp;amp; multiline === true &amp;amp;&amp;amp; id !== \&#39;____add-row\&#39;&quot; @click=cancel :disabled=&quot;mode === \&#39;saving\&#39;&quot; class=&quot;ui icon button btn&quot; _v-22804018=&quot;&quot;&gt;✗&lt;/button&gt; &lt;span v-show=&quot;mode === \&#39;readOnly\&#39;&quot; _v-22804018=&quot;&quot;&gt;{{{processedText}}}&lt;/span&gt; &lt;/div&gt; &#39;},function(t,e,n){var r,o;n(140),r=n(68),o=n(144),t.exports=r||{},t.exports.__esModule&amp;&amp;(t.exports=t.exports[&quot;default&quot;]),o&amp;&amp;((&quot;function&quot;==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var r,o;n(141),r=n(65),o=n(145),t.exports=r||{},t.exports.__esModule&amp;&amp;(t.exports=t.exports[&quot;default&quot;]),o&amp;&amp;((&quot;function&quot;==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var r,o;n(143),r=n(66),o=n(147),t.exports=r||{},t.exports.__esModule&amp;&amp;(t.exports=t.exports[&quot;default&quot;]),o&amp;&amp;((&quot;function&quot;==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(t,e,n){var r,o;n(142),r=n(67),o=n(146),t.exports=r||{},t.exports.__esModule&amp;&amp;(t.exports=t.exports[&quot;default&quot;]),o&amp;&amp;((&quot;function&quot;==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=o)},function(e,n){e.exports=t}])});</td>
      </tr>
      <tr>
        <td id="L3" class="blob-num js-line-number" data-line-number="3"></td>
        <td id="LC3" class="blob-code blob-code-inner js-file-line">//# sourceMappingURL=vue-smart-table.js.map</td>
      </tr>
</table>

  </div>

</div>

<button type="button" data-facebox="#jump-to-line" data-facebox-class="linejump" data-hotkey="l" class="hidden">Jump to Line</button>
<div id="jump-to-line" style="display:none">
  <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="" class="js-jump-to-line-form" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
    <input class="form-control linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" aria-label="Jump to line" autofocus>
    <button type="submit" class="btn">Go</button>
</form></div>

  </div>
  <div class="modal-backdrop js-touch-events"></div>
</div>


    </div>
  </div>

    </div>

        <div class="container site-footer-container">
  <div class="site-footer" role="contentinfo">
    <ul class="site-footer-links right">
        <li><a href="https://status.github.com/" data-ga-click="Footer, go to status, text:status">Status</a></li>
      <li><a href="https://developer.github.com" data-ga-click="Footer, go to api, text:api">API</a></li>
      <li><a href="https://training.github.com" data-ga-click="Footer, go to training, text:training">Training</a></li>
      <li><a href="https://shop.github.com" data-ga-click="Footer, go to shop, text:shop">Shop</a></li>
        <li><a href="https://github.com/blog" data-ga-click="Footer, go to blog, text:blog">Blog</a></li>
        <li><a href="https://github.com/about" data-ga-click="Footer, go to about, text:about">About</a></li>

    </ul>

    <a href="https://github.com" aria-label="Homepage" class="site-footer-mark" title="GitHub">
      <svg aria-hidden="true" class="octicon octicon-mark-github" height="24" version="1.1" viewBox="0 0 16 16" width="24"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path></svg>
</a>
    <ul class="site-footer-links">
      <li>&copy; 2016 <span title="0.08121s from github-fe126-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="https://github.com/site/terms" data-ga-click="Footer, go to terms, text:terms">Terms</a></li>
        <li><a href="https://github.com/site/privacy" data-ga-click="Footer, go to privacy, text:privacy">Privacy</a></li>
        <li><a href="https://github.com/security" data-ga-click="Footer, go to security, text:security">Security</a></li>
        <li><a href="https://github.com/contact" data-ga-click="Footer, go to contact, text:contact">Contact</a></li>
        <li><a href="https://help.github.com" data-ga-click="Footer, go to help, text:help">Help</a></li>
    </ul>
  </div>
</div>



    

    <div id="ajax-error-message" class="ajax-error-message flash flash-error">
      <svg aria-hidden="true" class="octicon octicon-alert" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M8.865 1.52c-.18-.31-.51-.5-.87-.5s-.69.19-.87.5L.275 13.5c-.18.31-.18.69 0 1 .19.31.52.5.87.5h13.7c.36 0 .69-.19.86-.5.17-.31.18-.69.01-1L8.865 1.52zM8.995 13h-2v-2h2v2zm0-3h-2V6h2v4z"></path></svg>
      <button type="button" class="flash-close js-flash-close js-ajax-error-dismiss" aria-label="Dismiss error">
        <svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg>
      </button>
      Something went wrong with that request. Please try again.
    </div>


      
      <script crossorigin="anonymous" integrity="sha256-8t5MhjpIeodxUJifllIyus/eF4q/nBlj2fhMXBmRbww=" src="https://assets-cdn.github.com/assets/frameworks-f2de4c863a487a877150989f965232bacfde178abf9c1963d9f84c5c19916f0c.js"></script>
      <script async="async" crossorigin="anonymous" integrity="sha256-iSLNCnLn1iwByWIrKsjGKvzUEUWF3hM0k0bMeJ1lrYE=" src="https://assets-cdn.github.com/assets/github-8922cd0a72e7d62c01c9622b2ac8c62afcd4114585de13349346cc789d65ad81.js"></script>
      
      
      
      
      
      
    <div class="js-stale-session-flash stale-session-flash flash flash-warn flash-banner hidden">
      <svg aria-hidden="true" class="octicon octicon-alert" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M8.865 1.52c-.18-.31-.51-.5-.87-.5s-.69.19-.87.5L.275 13.5c-.18.31-.18.69 0 1 .19.31.52.5.87.5h13.7c.36 0 .69-.19.86-.5.17-.31.18-.69.01-1L8.865 1.52zM8.995 13h-2v-2h2v2zm0-3h-2V6h2v4z"></path></svg>
      <span class="signed-in-tab-flash">You signed in with another tab or window. <a href="">Reload</a> to refresh your session.</span>
      <span class="signed-out-tab-flash">You signed out in another tab or window. <a href="">Reload</a> to refresh your session.</span>
    </div>
    <div class="facebox" id="facebox" style="display:none;">
  <div class="facebox-popup">
    <div class="facebox-content" role="dialog" aria-labelledby="facebox-header" aria-describedby="facebox-description">
    </div>
    <button type="button" class="facebox-close js-facebox-close" aria-label="Close modal">
      <svg aria-hidden="true" class="octicon octicon-x" height="16" version="1.1" viewBox="0 0 12 16" width="12"><path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48z"></path></svg>
    </button>
  </div>
</div>

  </body>
</html>


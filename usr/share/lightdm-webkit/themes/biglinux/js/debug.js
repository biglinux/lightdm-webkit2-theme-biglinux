class Debug {
	constructor() {
		this._debugModePass = 'toor';
		this._loadDebugObjects();
	}

	_loadDebugObjects() {
		if (!window.config) {
			window.config = {};
			window.config.get_str = function() {
				return '/usr/share/lightdm-webkit/themes/lightdm-webkit2-theme-glorious/assets/';
			};
		}

		if (!window.greeterutil) {
			window.greeterutil = {};
			window.greeterutil.dirlist = function(path) {
				return false;
			};
		}

		if (!window.lightdm) {
			window.lightdm = {
				is_authenticated: false,
				authentication_user: null,
				default_session: 'awesome',
				can_suspend: true,
				can_hibernate: true,
				can_shutdown: true,
				can_restart: true,
				sessions: [
					{
						name: 'awesome wm',
						key: 'awesome'
					},
					{
						name: 'bspwm',
						key: 'bspwm'
					},
					{
						name: 'KDE Plasma',
						key: 'plasma'
					},
					{
						name: 'Gnome 3',
						key: 'gnome'
					},
					{
						name: 'XFCE 4',
						key: 'xfce'
					},
					{
						name: 'Cinnamon',
						key: 'cinnamon'
					},
					{
						name: 'i3wm',
						key: 'i3'
					},
					{
						name: 'xmonad',
						key: 'xmonad'
					},
					{
						name: 'Deepin',
						key: 'deepin'
					},
					{
						name: 'Budgie',
						key: 'budgie'
					}
				],
				users: [
					{
						display_name: 'Cientist Rat',
						username: 'cientist-rat',
						image: 'assets/profiles/cientist-rat.jpg'
					},
					{
						display_name: 'Chessmind',
						username: 'chessmind',
						image: 'assets/profiles/chessmind.jpg'
					},
					{
						display_name: 'Penguin Tie',
						username: 'penguin-tie',
						image: 'assets/profiles/penguin-tie.jpg'
					},
					{
						display_name: 'Music Persona',
						username: 'music-persona',
						image: 'assets/profiles/music-persona.jpg'
					},
					{
						display_name: 'Bright Mind',
						username: 'bright-mind',
						image: 'assets/profiles/bright-mind.jpg'
					},
					{
						display_name: 'Bright Eyes',
						username: 'bright-eyes',
						image: 'assets/profiles/bright-eyes.jpg'
					},
					{
						display_name: 'Default User',
						username: 'default-user',
						image: 'assets/profiles/default-user.svg'
					}
				],
				languages: [
					{
						name: 'American English',
						code: 'en_US.utf8'
					}
				],
				language: 'American English',
				authenticate: username => {
					console.log(`Starting authenticating user: '${username}'`);
				},
				cancel_authentication: () => {
					console.log('Auth cancelled');
				},
				respond: password => {
					console.log(`Password provided: '${password}'`);
					if (password === this._debugModePass) {
						lightdm.is_authenticated = true;
					}
					else {
						let now = new Date().getTime();
						while (new Date().getTime() < now + 2000);
					}
					authentication_complete();
				},
				start_session_sync: session => {
					alert(`Logged with session: '${session}'!`);
					location.reload(); 
				},
				shutdown: () => {
					alert('System is shutting down...');
					location.reload(); 
				},
				restart: () => {
					alert('System is rebooting...');
					location.reload(); 
				},
				hibernate: () => {
					alert('System is hibernating...');
				},
				suspend: () => {
					alert('System is suspending...');
				}
			};
		}
	}
}

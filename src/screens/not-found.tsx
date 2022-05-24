/** @jsx jsx */
import {jsx} from '@emotion/core'

import {Link} from 'components/lib'

export function NotFoundScreen() {
	return (
		<div
			css={{
				height: '100%',
				display: 'grid',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div>
				<p>Sorry... nothing here.</p>
				<Link to="/discover">Go home</Link>
			</div>
		</div>
	)
}

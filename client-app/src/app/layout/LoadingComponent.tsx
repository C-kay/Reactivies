import React from 'react'
import { Dimmer, Image, Loader, Segment } from 'semantic-ui-react';

export const LoadingComponent : React.FC<{inverted?: boolean, content?: string}> = ({inverted=true, content}) => {
    return (
      <Segment>
        <Dimmer active inverted={inverted}>
          <Loader content={content} />
        </Dimmer>

        <Image src='/images/wireframe/short-paragraph.png' />
      </Segment>
    );
}

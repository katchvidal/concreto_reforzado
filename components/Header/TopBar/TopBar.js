import React from "react";
import { Container, Grid, Image, Input } from "semantic-ui-react";
import Link from "next/link";

export default function TopBar() {
  return (
    <div className="top-bar">
      <Container>
        <Grid>
          <Grid.Column width={8} className="top-bar__left">
            <LogoType />
          </Grid.Column>
          <Grid.Column width={8} className="top-bar__right">
            <Search />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
}

function LogoType() {
  return (
    <Link href="/">
      <a>
        <Image src="/logo01.png" alt="Gaming"></Image>
      </a>
    </Link>
  );
}

function Search() {
  return <Input id="search-game" icon={{ name: "search" }} />;
}

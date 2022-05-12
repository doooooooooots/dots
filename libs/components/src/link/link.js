import * as React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useRouter } from "next/router";
import NextLink from "next/link";
import LinkMui from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import { Button, IconButton } from "@mui/material";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

const MuiLink = styled(LinkMui)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.primary,
}));

export const NextLinkComposed = React.forwardRef((props, ref) => {
  const {
    linkAs,
    href,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    ...other
  } = props;

  return (
    <NextLink
      href={href}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

NextLinkComposed.propTypes = {
  href: PropTypes.any,
  linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  locale: PropTypes.string,
  passHref: PropTypes.bool,
  prefetch: PropTypes.bool,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef((props, ref) => {
  const {
    activeClassName = "active",
    as: linkAs,
    className: classNameProps,
    href,
    noLinkStyle,
    variant = "link",
    icon,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return (
        <Anchor className={className} href={href} ref={ref} {...other} />
      );
    }

    return (
      <MuiLink className={className} href={href} ref={ref} {...other} />
    );
  }

  if (noLinkStyle) {
    return (
      <NextLinkComposed
        className={className}
        ref={ref}
        to={href}
        {...other}
      />
    );
  }

  if (["outlined", "contained"].includes(variant)) {
    return (
      <Button
        component={NextLinkComposed}
        variant={variant}
        ref={ref}
        href={href}
        {...other}
      >
        ok
      </Button>
    );
  }

  if (["iconButton"].includes(variant)) {
    return (
      <IconButton
        component={NextLinkComposed}
        ref={ref}
        href={href}
        {...other}
      >
        {icon}
      </IconButton>
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      linkAs={linkAs}
      className={className}
      ref={ref}
      href={href}
      {...other}
    />
  );
});

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string,
  href: PropTypes.any,
  noLinkStyle: PropTypes.bool,
  role: PropTypes.string,
};

export default Link;

<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes" />
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title><xsl:value-of select="rss/channel/title" /> RSS Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <style type="text/css">
          html {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
            color: #1a202c;
            background-color: #f7fafc;
          }
          body {
            max-width: 900px;
            margin: 0 auto;
            padding: 2rem 1rem;
            line-height: 1.6;
          }
          a {
            color: #0ea5e9;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          header {
            margin-bottom: 2rem;
          }
          h1 {
            font-size: 2rem;
            font-weight: 700;
            margin: 0.5rem 0;
            color: #0c4a6e;
          }
          h2 {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0.5rem 0;
          }
          .description {
            margin-top: 0.75rem;
            font-style: italic;
            color: #4a5568;
          }
          .post {
            margin-bottom: 2rem;
            padding: 1.5rem;
            background-color: #ffffff;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          }
          .post-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-bottom: 0.5rem;
          }
          .post-meta {
            font-size: 0.875rem;
            color: #4a5568;
            margin-bottom: 0.75rem;
          }
          .post-description {
            margin-bottom: 1rem;
          }
          .post-link {
            display: inline-block;
            font-weight: 500;
          }
          .post-categories {
            margin-top: 0.75rem;
          }
          .post-categories span {
            display: inline-block;
            font-size: 0.75rem;
            padding: 0.125rem 0.5rem;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            background-color: #e0f2fe;
            color: #0369a1;
            border-radius: 9999px;
          }
          footer {
            margin-top: 2rem;
            font-size: 0.875rem;
            text-align: center;
            color: #4a5568;
          }
        </style>
      </head>
      <body>
        <header>
          <h1><xsl:value-of select="rss/channel/title" /></h1>
          <div class="description">
            <xsl:value-of select="rss/channel/description" />
          </div>
          <p>
            <a>
              <xsl:attribute name="href">
                <xsl:value-of select="rss/channel/link" />
              </xsl:attribute>
              Visit Website
            </a>
            <span> | </span>
            <a>
              <xsl:attribute name="href">
                <xsl:value-of select="rss/channel/atom:link/@href" />
              </xsl:attribute>
              RSS Feed URL
            </a>
          </p>
        </header>
        
        <main>
          <h2>Latest Posts</h2>
          <xsl:for-each select="rss/channel/item">
            <div class="post">
              <div class="post-title">
                <a>
                  <xsl:attribute name="href">
                    <xsl:value-of select="link" />
                  </xsl:attribute>
                  <xsl:value-of select="title" />
                </a>
              </div>
              <div class="post-meta">
                Published: <xsl:value-of select="pubDate" />
                <xsl:if test="author">
                  <span> | By: <xsl:value-of select="author" /></span>
                </xsl:if>
                <xsl:if test="category">
                  <span> | Category: <xsl:value-of select="category" /></span>
                </xsl:if>
              </div>
              <div class="post-description">
                <xsl:value-of select="description" />
              </div>
              <a class="post-link">
                <xsl:attribute name="href">
                  <xsl:value-of select="link" />
                </xsl:attribute>
                Read More →
              </a>
              <xsl:if test="category[position() > 1]">
                <div class="post-categories">
                  <xsl:for-each select="category[position() > 1]">
                    <span><xsl:value-of select="." /></span>
                  </xsl:for-each>
                </div>
              </xsl:if>
            </div>
          </xsl:for-each>
        </main>
        
        <footer>
          <p>RSS feed generated by StockSage. Last updated: <xsl:value-of select="format-dateTime(current-dateTime(), '[MNn] [D], [Y]')" /></p>
        </footer>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>

FROM ruby:3.1-slim AS builder

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    nodejs \
    npm \
    && npm install -g yarn \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

ENV BUNDLE_DEPLOYMENT=true \
    BUNDLE_WITHOUT="development test"

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

ARG SECRET_KEY_BASE=dummy
RUN RAILS_ENV=production SECRET_KEY_BASE=$SECRET_KEY_BASE \
    bundle exec rails assets:precompile


FROM ruby:3.1-slim

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends libpq5 && \
    rm -rf /var/lib/apt/lists/*

RUN groupadd -r rails && useradd -r -g rails rails

WORKDIR /app

COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY --from=builder --chown=rails:rails /app /app

USER rails

ENV RAILS_ENV=production \
    RAILS_SERVE_STATIC_FILES=true \
    RAILS_LOG_TO_STDOUT=true

EXPOSE 3000

CMD ["bundle", "exec", "puma", "-C", "config/puma.rb"]
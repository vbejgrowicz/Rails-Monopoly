Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'home#index'

  devise_for :users, skip: :registrations
  devise_scope :user do
    resource :registration,
      only: [:new, :create],
      path: 'users',
      path_names: { new: 'sign_up' },
      controller: 'devise/registrations',
      as: :user_registration do
        # get :cancel
      end
  end

  namespace :api do
    defaults format: :json do
      resources :games, only: [:new, :index, :create, :show, :update] do
        resources :players, only: [:create]
        resources :turns, only: [:index, :update]
      end

      resources :players, only: [:show] do
        resources :rolls, only: [:create]
      end

      resources :users, only: [:show]

      resources :spaces, only: [:index]
    end
  end

  get '*path', to: 'home#index'
end

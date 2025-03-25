# hms-sa
This tutorial covers the essential Git commands for **branching, pulling, and pushing code** without affecting the `main` branch.
---
## 1️⃣ Cloning the Repository
If you haven't cloned the repository yet, use:
```sh
# Clone the repository
git clone <repository-url>

# Navigate into the repository
cd <repository-name>
```
---
## 2️⃣ Creating & Switching to a New Branch
Always create a new branch for your feature or bug fix instead of working directly on `main`.

```sh
# Fetch the latest changes from the remote repository
git fetch origin

# Create and switch to a new branch (replace <branch-name> with a descriptive name)
git checkout -b <branch-name>
```

### Example:
```sh
git checkout -b feature/login-page
```

---
## 3️⃣ Making Changes & Committing
After making changes in the code, you need to **stage and commit** them:

```sh
# Stage all changes
git add .

# Commit with a meaningful message
git commit -m "Added login page UI"
```

---
## 4️⃣ Pulling Latest Changes from Remote Branch
Before pushing your branch, ensure you're up to date with the latest changes:

```sh
# Switch to the main branch
git checkout main

# Pull the latest updates
git pull origin main

# Switch back to your branch
git checkout <branch-name>

# Merge main into your branch to avoid conflicts
git merge main
```

If there are conflicts, resolve them manually, then commit.

---
## 5️⃣ Pushing the Branch to Remote Repository
Once your changes are committed, push your branch to the remote repository:

```sh
# Push the branch to GitHub
git push origin <branch-name>
```

### Example:
```sh
git push origin feature/login-page
```

---
## 6️⃣ Creating a Pull Request (PR)
After pushing, create a **Pull Request (PR)** on GitHub:
1. Go to the GitHub repository.
2. Click **"Pull Requests"** → **"New Pull Request"**.
3. Select your branch (`feature/login-page`) as the source and `main` as the target.
4. Add a description of your changes.
5. Request a review from your teammates.
6. Once approved, merge it into `main`.

---
## 7️⃣ Deleting Merged Branches (Cleanup)
Once your branch is merged, delete it to keep the repository clean:
```sh
# Delete the branch locally
git branch -d <branch-name>

# Delete the branch from remote
git push origin --delete <branch-name>
```

---
## 🎯 Summary of Commands
| Action                     | Command |
|----------------------------|------------------------------------------------|
| Clone repository           | `git clone <repository-url>` |
| Create a new branch        | `git checkout -b <branch-name>` |
| Switch branches            | `git checkout <branch-name>` |
| Stage changes              | `git add .` |
| Commit changes             | `git commit -m "commit message"` |
| Pull latest changes        | `git pull origin main` |
| Push branch to remote      | `git push origin <branch-name>` |
| Merge latest main changes  | `git merge main` |
| Delete local branch        | `git branch -d <branch-name>` |
| Delete remote branch       | `git push origin --delete <branch-name>` |

This ensures a **clean, conflict-free workflow** for our team! 🚀

